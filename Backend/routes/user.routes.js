import express from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('firstname must be atleast 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
], userController.registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', userController.logOut);

export default router;