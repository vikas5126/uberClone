const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerCaptain = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptain = await captainModel.findOne({email});
    if(isCaptain){
        return res.status(400).json({
            message: "Captain already exists"
        });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    // res.cookie('token', token)

    res.status(201).json({
        token,
        captain
    })
}

module.exports.loginCaptain = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    // console.log('Email:', email); // Log the email

    const captain = await captainModel.findOne({email}).select('+password');
    // console.log('User:', user); // Log the user result

    if(!captain){
        return res.status(401).json({
            message: "invalid email or password"
        });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({
        token,
        captain
    })
}

module.exports.getProfile = async(req, res, next) => {
    const captain = req.captain;
    return res.status(200).json({
        captain
    })
}

module.exports.logoutCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    await blackListTokenModel.create({token});

    res.clearCookie('token');

    return res.status(200).json({
        message: "Logged out successfully"
    })
}