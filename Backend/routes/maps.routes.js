// Initialize express router
import express from 'express';
import { query } from 'express-validator';
import mapController from '../controllers/map.controller.js';
import authmiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}),
    authmiddleware.authUser , 
    mapController.getCoordinates
)

router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authmiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authmiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

export default router;