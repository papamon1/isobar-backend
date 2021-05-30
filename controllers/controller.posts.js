const Post = require("../models/model.posts");

exports.getPosts = (req, res) => {
  Post.find({})
    //As we don't need the whole object, we only take the name
    .populate("author", "name")
    .exec((errors, posts) => {
      if (errors) {
        return res.status(422).send({ errors });
      }

      return res.status(200).json({ posts });
    });
};
