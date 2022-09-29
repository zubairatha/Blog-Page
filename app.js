const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent = "Welcome to your blog page";
const aboutContent = "Made by Zubair Atha";
const contactContent = "zubair.atha09@gmail.com";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { posts:posts, homeStartingContent:homeStartingContent });
});

app.get("/about", function(req,res) {
  res.render("about", { aboutContent:aboutContent });
});

app.get("/contact", function(req,res) {
  res.render("contact", { contactContent:contactContent });
});

app.get("/compose", function(req,res) {
  res.render("compose", {});
});

app.get("/posts/:postTitle", function(req,res){
  for(var i=0;i<posts.length;i++) {
    if(_.lowerCase(req.params.postTitle) === _.lowerCase(posts[i].title))
    {
      res.render("post", { post:posts[i] });
      break;
    }
  }
});

// app.post("/", function(req,res) {
//   res.render("/",{articles:articles})
// });

app.post("/compose", function(req,res) {
  let newTitle = req.body.publishedTitle;
  let newArticle = req.body.publishedArticle;
  let newPost = {title:newTitle, article:newArticle};
  posts.push(newPost);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
