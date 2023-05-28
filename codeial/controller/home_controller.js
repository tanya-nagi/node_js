const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('use_name',25)

//   Post.find({}).then((posts) => {
//     console.log(posts, "---post");
//     return res.render("home", {
//       title: "Codeial | Home",
//       posts: posts,
//     });
//   });

//populate the user of each object
Post.find({}).populate('user').then((posts)=>{
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts
    });
})

  // return res.render('home',{
  //     title:"Home"
  // });
};
