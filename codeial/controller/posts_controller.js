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

module.exports.destroy = function(req, res){
  Post.findById(req.params.id).then( 
    (post)=>{
      console.log(post,'---post');
      // .id means converting the object id into string

      if(post.user == req.user.id){
        post.remove();

        Comment.deleteMany({post: req.params.id}, function(err){
          return res.redirect('back');
        });
      }else{
        return res.redirect('back');
      }

  });
}
