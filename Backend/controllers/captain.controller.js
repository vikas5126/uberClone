import captainService from '../services/captain.service.js';
import captainModel from '../models/captain.model.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListToken.model.js';

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptain = await captainModel.findOne({ email });
    if (isCaptain) {
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

    res.status(201).json({
        token,
        captain
    });
};

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({
            message: "invalid email or password"
        });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({
        token,
        captain
    });
};

const getProfile = async (req, res, next) => {
    const captain = req.captain;
    return res.status(200).json({
        captain
    });
};

const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    return res.status(200).json({
        message: "Logged out successfully"
    });
};

export default { registerCaptain, loginCaptain, getProfile, logoutCaptain };