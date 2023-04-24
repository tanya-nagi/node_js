const mongoose = require('mongoose');

const codeialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true // validation should be true
    },
    phone:{
        type: String,
        required : true
    }
});

const Codeial = mongoose.model('Codeial',codeialSchema )
module.exports= Codeial

