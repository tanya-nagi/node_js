const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true, // validation should be true means it is required
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    }
},{
    timestamps: true // when we have created the db and when we have updated it
});

const User = mongoose.model('User',userSchema )
module.exports= User

