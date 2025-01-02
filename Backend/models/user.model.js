const mongoose = require('mongoose');
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, "First Name must be at least 3 characters"]
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
            minlength:[5, "Email must be at least 5 characters long"]
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        socketId: {
            type: String,
        }
})

userSchema.methods.generateAuthToken = function(){
    console.log(this._id);
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password)=> {
    return await bcypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;