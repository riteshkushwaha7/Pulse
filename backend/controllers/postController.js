const Post = require('../models/Post');
const User = require('../models/User');
const constants = require('../config/constants');

exports.createPost = async (req, res, next) => {
  try {
    const { text, imageUrl } = req.body;
    const userId = req.userId;

    if (!text && !imageUrl) {
      return res.status(400).json({ error: 'Post must have either text or imageUrl' });
    }

    const post = new Post({
      author: userId,
      text,
      imageUrl,
    });

    await post.save();
    await post.populate('author', 'username email');

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || constants.PAGINATION_LIMIT;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'username email')
      .populate('comments.userId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    await post.populate('author', 'username email');

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.userId;

    if (!comment) {
      return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      userId,
      username: user.username,
      comment,
      createdAt: new Date(),
    });

    await post.save();
    await post.populate('author', 'username email');

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};
