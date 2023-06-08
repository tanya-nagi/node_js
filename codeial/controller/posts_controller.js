const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(() => {
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
      return res.redirect("back")
    }else{
      return res.redirect("back")

    }
  }
  catch(error){
    return res.redirect("back")
  }
  
}
