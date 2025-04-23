const Post = require('../models/post.model');

exports.createPost = async (data) => {
  const post = new Post(data);
  await post.save();
  return post;
};

exports.likePost = async (postId, userId) => {
  return Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: userId } },
    { new: true }
  );
};

exports.commentPost = async (postId, comment) => {
  return Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment } },
    { new: true }
  );
};
