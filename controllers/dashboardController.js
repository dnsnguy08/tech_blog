// Dashboard routes
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
      } else {
        Post.findAll({
            where: {
              // use the ID from the session
              userId: req.session.userId
            },
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
          })
            .then(dbPostData => {
              // serialize data before passing to template
              const posts = dbPostData.map(post => post.get({ plain: true }));
              res.render('dashboard', { posts, loggedIn: true });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
      }
    
  });

  router.get('/edit/:id', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
      } else {
        Post.findOne({
            where: {
              id: req.params.id
            },
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
          })
            .then(dbPostData => {
              if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
              }
        
              // serialize the data
              const post = dbPostData.get({ plain: true });
      
              res.render('editPost', {
                  post,
                  loggedIn: true
                  });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
      }
    
});

router.get('/create', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
      } else {
        Post.findAll({
            where: {
              // use the ID from the session
              userId: req.session.userId
            },
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
          })
            .then(dbPostData => {
              // serialize data before passing to template
              const posts = dbPostData.map(post => post.get({ plain: true }));
              res.render('createPost', { posts, loggedIn: true });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
      }
    
  });


module.exports = router;