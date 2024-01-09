const jwt = require("jsonwebtoken");

const requireSign = (req, res, next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user=user;
    } else {
        return res
            .status(401)
            .json({error:"authorization required"});
    }
    next();
};

const userMiddleware = (req, res, next) =>{
    if (req.user.isAdmin==true){
        return res
            .status(401)
            .json({error:"User Acess Denied"})
    }
    next();
};

const adminMiddleware = (req, res, next) => {
    if(req.user.isAdmin==false){
        return res
            .status(401)
            .json({error:"Not authorised as an admin"})
    }
    next();
}

module.exports = commonMiddleware = {
    requireSign,
    userMiddleware,
    adminMiddleware
};