const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next)=>{
    try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }
    catch (err)
    {
        return res.status(401).json({error: "Authorization required"});
    }
    next();
};

module.exports  = { isLoggedIn };