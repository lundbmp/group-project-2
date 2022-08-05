const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Category, Tag, Upvote, Downvote } = require('../models');
const withAuth = require('../utils/auth');

// Beer Category Route 
router.get('/beer', (req, res) => {
  // The Model table 'Post' and sequelize method 'findall()'
  Post.findAll({  // to filter so only some columns are returned you can utilize 'attributes' in sequelize
    where: {
      category_id: 1
    },
    attributes: ['title', 'price', 'post_body', 'created_at', 'post_url'],
    //Need to include the upvotes and downvotes tally 
    include: [
      {
        model: Upvote,
        attributes: ['id', 'user_id', 'post_id']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Wine Category Route 
router.get('/wine', (req, res) => {
  // The Model table 'Post' and sequelize method 'findall()'
  Post.findAll({  // to filter so only some columns are returned you can utilize 'attributes' in sequelize
    where: {
      category_id: 2
    },
    attributes: ['title', 'price', 'post_body', 'created_at', 'post_url'],
    //Need to include the upvotes and downvotes tally 
    include: [
      {
        model: Upvote,
        attributes: ['id', 'user_id', 'post_id']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Spirits-Hard Liquor Route
router.get('/spirits', (req, res) => {
  // The Model table 'Post' and sequelize method 'findall()'
  Post.findAll({  // to filter so only some columns are returned you can utilize 'attributes' in sequelize
    where: {
      category_id: 3
    },
    attributes: ['title', 'price', 'post_body', 'created_at', 'post_url'],
    //Need to include the upvotes and downvotes tally 
    include: [
      {
        model: Upvote,
        attributes: ['id', 'user_id', 'post_id']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Home Route to view all Posts 
router.get('/', (req, res) => {
  // The Model table 'Post' and sequelize method 'findall()'
  Post.findAll({  // to filter so only some columns are returned you can utilize 'attributes' in sequelize
    attributes: ['title', 'price', 'post_body', 'created_at', 'post_url'],
    //Need to include the upvotes tally 
    include: [
      {
        model: Upvote,
        attributes: ['id', 'user_id', 'post_id']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to view a single post that includes the comments 
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['title', 'price', 'post_body', 'created_at', 'post_url'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


})

// if user access login page and they are already logged in, redirect to home page, else display login. 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router; 