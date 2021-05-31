const Post = require("../models/model.posts");
const axios = require("axios");
const { eventNames } = require("../models/model.posts");

// Had also this version with our own model, but after all, decided to query
// a free sample service, so we can have an example of calling a third service
// from the backend. The method below will return a sample post from our database

// exports.getPosts = (req, res) => {
//   Post.find({})
//     //As we don't need the whole object, we only take the name
//     .populate("author", "name")
//     .exec((errors, posts) => {
//       if (errors) {
//         return res.status(422).send({ errors });
//       }

//       return res.status(200).json({ posts });
//     });
// };

exports.getPosts = (req, res) => {
  axios
    .get("https://dummyapi.io/data/api/user?limit=10", {
      headers: { "app-id": process.env.DUMMYAPI_ID },
    })
    .then((postsRes) => {
      return res.status(200).json({ posts: postsRes.data.data });
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
};
