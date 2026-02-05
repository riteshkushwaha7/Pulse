const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getFeed);
router.put('/:id/like', authMiddleware, postController.toggleLike);
router.post('/:id/comment', authMiddleware, postController.addComment);

module.exports = router;
