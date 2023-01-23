import mongoose from "mongoose";

const users = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
});

export default mongoose.model('users', users);