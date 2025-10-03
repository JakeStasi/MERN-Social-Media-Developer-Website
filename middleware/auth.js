const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = function(req, res, next) {
    
    // Get token from header
    // The token will be sent in the header as x-auth-token
    const token = req.header("x-auth-token");


    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token authorization denied"});
    }

    // Verify token
    // If the token is valid, we will decode it and get the user id
    try {

        const decoded = jwt.verify(token, config.get("jwtToken"));
        req.user = decoded.user;
        next();

    } catch(err){
        res.status(401).json({msg : "Token is not valid"});
    }
}
