const userModel =require('../models/user.model');
const captainModel = require('../models/captain.model');   
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlackListToken = await blackListTokenModel.findOne({token});

    if(isBlackListToken){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded){
        if(err){
            console.log(err);
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        // console.log(decoded);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    });
}


module.exports.authCaptain = async(req, res, next)=> {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isBlackListToken = await blackListTokenModel.findOne({token});

    if(isBlackListToken){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        return next()
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}