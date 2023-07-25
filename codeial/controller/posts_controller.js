const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  let post =Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(() => {

      if(req.xhr){
        return res.status(200).json({
          data:{
            post:post
          },
          message:"Post created"
        })
      }

      req.flash('success','Post created successfully!')
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("error in creating post");
    });
};

module.exports.destroy = async function(req, res){
  try{
    const post = await
    Post.findByIdAndDelete(req.params.id)
    if(post && post.user === req.user.id){
      await Comment.deleteMany({post:req.params.id});
      req.flash('success','Post and associated comments are deleted')
      return res.redirect("back")
      
    }else{
      req.flash('error','You cannot be able to delete this post')

      return res.redirect("back")

    }
  }
  catch(error){
    return res.redirect("back")
  }
  
}
