const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {address} = req.body;
    console.log(address);

    try{
        console.log('hitting an api');
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({
            message: 'Coordinates not found'
        });
    }
}