const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('use_name',25)

  // Post.find({}).then((posts) => {
  //   return res.render("home", {
  //     title: "Codeial | Home",
  //     posts: posts,
  //   });
  // });

  //populate the user of each object
  //need to cehck on this
  // Post.find({})
  //   .populate("user")
  //   .populate({
  //     path: "comments",
  //     populate: {
  //       path: "user",
  //     },
  //   })
  //   .then((posts)=>{
  //     User.find({}).then((users)=>{
  //       return res.render('home', {
  //         title: "Codeial | Home",
  //         posts:  posts,
  //         all_users: users
  //     });

  //     })

  //     });

  // return res.render('home',{
  //     title:"Home"
  // });

  try {
    //using async await
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('---err',err)
    return
  }
};
