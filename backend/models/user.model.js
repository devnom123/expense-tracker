import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        enum: ["male","female"],
        default: null,
    },
    
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;