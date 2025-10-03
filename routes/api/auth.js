const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Get gets information
// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch (err){
        console.error(err.message);
        res.status(500).send("Server Error >:( ")
    }
});

// Post creates a new user
// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", 
[
   
    check("email", " Please enter a valid email").isEmail(),
    check("password", "Password is required!").exists()
],

async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array() });
    } 

    const { email, password} = req.body;

    try {

        let user = await User.findOne( {email});
        if (!user){
            return res.status(400).json({ errors : [{ msg: "Invalid Credentials"}] });
        }

        
       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
            return res.status(400).json({ errors : [{ msg : "Invalid Credentials"}] }); 
       }


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