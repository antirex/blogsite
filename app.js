//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var postsArray = [];
const homeStarting=
  "Ara! Ara! minasan konichiwa! orewa Sai desu yoroshku!"
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", function (req, res) {
  res.render("home", {
    homeContent: homeStarting,
    posts: postsArray,
  });
});

app.get("/", (req, res)=> {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: postsArray,
  });
});

app.get("/about",(req, res)=>{
  res.render("about", { aboutContent1: aboutContent });
});

app.get("/compose",(req, res) =>{
  res.render("compose");
});

app.get("/contact",(req, res)=> {
  res.render("contact", { contactContent1: contactContent });
});

app.get("/posts/:topic",(req, res)=> {
  let urlTitle = _.lowerCase(req.params.topic);

  postsArray.forEach(function (obj) {
    let pageTitle = obj.blogTitle;
    let pageContent = obj.blogContent;
    if (_.lowerCase(pageTitle) === urlTitle) {
      res.render("post", { title: pageTitle, cont: pageContent });
    }
  });
});

app.post("/compose",(req, res)=> {
  let post = {
    blogTitle: req.body.newContent,
    blogContent: req.body.post,
  };
  postsArray.push(post);
  res.redirect("/");
});

app.listen(4000, function () {
  console.log("Server is live on port 4000");
});
