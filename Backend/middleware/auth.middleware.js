import userModel from '../models/user.model.js';
import captainModel from '../models/captain.model.js';
import jwt from 'jsonwebtoken';
import blackListTokenModel from '../models/blackListToken.model.js';

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const isBlackListToken = await blackListTokenModel.findOne({ token });

  if (isBlackListToken) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  });
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const isBlackListToken = await blackListTokenModel.findOne({ token });

  if (isBlackListToken) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default {
  authUser,
  authCaptain
};