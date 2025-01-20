// Initilizing the express router
import express from 'express';
import captainController from '../controllers/captain.controller.js';
import { body } from 'express-validator';
import middlware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be atleast 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').matches(/\d{3}-\d{3}-\d{3}/).withMessage('Please enter a valid plate number'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid Vehicle Type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], captainController.loginCaptain);

router.get('/profile', middlware.authCaptain ,captainController.getProfile);


router.get('/logout', middlware.authCaptain, captainController.logoutCaptain);

export default router;