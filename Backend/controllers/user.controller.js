import userModel from '../models/user.model.js';
import userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import blackListTokenModel from '../models/blackListToken.model.js';

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isEmail = await userModel.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.cookie('token', token);

  res.status(201).json({
    token,
    user
  });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      message: "invalid email or password"
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    token,
    user
  });
};

const getUserProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    user
  });
};

const logOut = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await blackListTokenModel.create({ token });
  res.status(200).json({
    message: "Logged Out"
  });
};

export default { registerUser, loginUser, getUserProfile, logOut };