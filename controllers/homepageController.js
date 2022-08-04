// Homepage routes

const router = require('express').Router();
const apiController = require('./apiController');
const {User, Comment, Post} = require('../models');

// renders landing page
router.get('/', async (req, res) => {
    console.log(req.session);

    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
              ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'created_at'],
                    include: {
                    model: User,
                    attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = dbPostData.map(post => post.get({plain: true}));

        res.render('landingPage', {
            posts,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/signin', (req,res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signin', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/signup', (req,res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', async (req,res) => {
    try {
        const dbPostData = await Post.findOne({
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
              ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'created_at'],
                    include: {
                    model: User,
                    attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({plain: true});

        res.render('single-post', {
            post,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json({error});
    }
});

// sends routes w/ /api to apiController.js file
router.use('/api', apiController);

module.exports = router;