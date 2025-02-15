

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// const { removeListener } = require('./user.model');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name must be at least 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last Name must be at least 3 characters"]
        }   
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },  
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 character long']
        },
        plate:{
            type: String,
            required: true,
            unique: true,
            match: [/\d{3}-\d{3}-\d{3}/, 'Please enter a valid plate number']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'moto', 'auto'],
            default: 'moto'
        }
    },

    location: {
        ltd: {
            type: Number
        },
        lng:{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    return token;
}   

captainSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

export default captainModel;