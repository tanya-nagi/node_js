const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = (req,res)=>{
    Post.findById(req.body.post).then((post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then((comment)=>{
                post.comments.push(comment)
                //save value in db previously it will be in memory
                post.save()
                res.redirect('/')

            }).catch((error)=>console.log(error,'----error'))
        }

    })

}