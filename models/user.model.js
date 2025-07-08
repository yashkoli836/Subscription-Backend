
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], 
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    email:{
        type: String,
        required: [true, 'Name is required'], 
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
    },
    password:{
        type: String,
        required: [true, 'Password is required'], 
        minLength: 6
    }
    
}, {
    timestamps: true //created at, updated at
})

const User = mongoose.model('User', userSchema);

export default User;

//{name: 'abc', email: 'a@b.com', password: '123456'}