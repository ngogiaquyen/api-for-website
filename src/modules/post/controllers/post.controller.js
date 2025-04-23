const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
  try {
    console.log({ ...req.body})
//     const post = await postService.createPost({ ...req.body});

//     // Emit event realtime
//     const io = req.app.get('io');
//     io.emit('new_post', post);

//     res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await postService.likePost(req.params.id, req.user.id);
    const io = req.app.get('io');
    io.emit('like_post', { postId: post._id, userId: req.user.id });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const post = await postService.commentPost(req.params.id, {
      user: req.user.id,
      text: req.body.text,
    });
    const io = req.app.get('io');
    io.emit('comment_post', { postId: post._id, comment: req.body.text });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
