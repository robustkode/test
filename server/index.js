const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./models/Post");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kalidadefa:76VwtAv1Aj3ra9ON@cluster0.wjulwca.mongodb.net/db?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  res.json("Hello");
});
app.get("/posts", (req, res) => {
  // const {name, email, password} = req.body;
  // RegisterModel.findOne({email: email})
  // .then(user => {
  //     if(user) {
  //         res.json("Already have an account")
  //     } else {
  //         RegisterModel.create({name: name, email: email, password: password})
  //         .then(result => res.json(result))
  //         .catch(err => res.json(err))
  //     }
  // }).catch(err => res.json(err))

  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
