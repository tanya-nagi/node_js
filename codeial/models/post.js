const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of id of comment in post schema
    comment:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post_Schema',postSchema)
module.exports = Post