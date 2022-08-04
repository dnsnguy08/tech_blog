const router = require('express').Router();

const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

router.use('/users', userController);
router.use('/posts', postController);
router.use('/comments', commentController);

module.exports = router;