const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");


const User = require("../../models/User")

// ( req, res) is the callback function
// req is the request from the client ( the front end) and gives us access to the data like req.body but also req.params which is values in the URL path, req.headers for info about the request, req.method which POST, GET or other method was used, etc
// res is the response we send back to the user ( the front end) like res.send which sends text or res.stats which snes a a stats code

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", 
[
    check("name", " Name is required !").not().isEmpty(),
    check("email", " Please enter a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min:6}) 
],

async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array() });
    } 

    const { name, email, password} = req.body;

    try {

        let user = await User.findOne( {email});
        if (user){
            return res.status(400).json({ errors : [{ msg: "User already exists"}] });
        }

        

        const avatar = gravatar.url(email,{
            s : "200",
            r: "pg",
            d: "mm"
        })


        user = new User({
            name,email,avatar,password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        

        // For user authentication, we will use jsonwebtoken
        // We will create a payload with the user id
        // and sign it with a secret token
        // The secret token will be stored in the config/default file
        const payload = {
            user: {
                id : user.id
            }
        }

        jwt.sign(payload, config.get("jwtToken"),
        {expiresIn: 360000},
        (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    }   catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
    



    
    
});

module.exports = router;