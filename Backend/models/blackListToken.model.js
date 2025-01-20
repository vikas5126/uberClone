import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
})

const blackListTokenModel = mongoose.model('blackListTokens', blackListTokenSchema);

export default blackListTokenModel;