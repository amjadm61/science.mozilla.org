// var ObjectID = require('mongodb').ObjectID;
'use strict';
var WP = require( 'wordpress-rest-api' ),
    wp = new WP({ endpoint: 'http://mozillascience.org/wp-json' });

module.exports = function() {


  return {
    getAll: function(req, res, next){
      wp.posts().get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          res.render('blog.jade', {loggedIn: !!req.user,
                                  posts: posts,
                                  user : req.user || undefined})
      });
    },
    get: function(req, res, next){
      wp.posts().name( req.params.slug ).get(function( err, post ) {
          if ( err ) {
              return console.log(err);
          }
          if(post.title){
            res.render('post.jade', {loggedIn: !!req.user,
                                    content: post,
                                    user : req.user || undefined})
          } else {
            res.status(404).end();
          }
      });
    },
    author: function(req, res, next){
      wp.posts().author( req.params.author ).get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          res.render('blog.jade', {loggedIn: !!req.user,
                                  posts: posts,
                                  user : req.user || undefined,
                                  author: req.params.author})
      });
    },
    feed: function(req, res, next){
      wp.posts().get(function( err, posts ) {
          if ( err ) {
              return console.log(err);
          }
          res.render('rss.jade', {posts: posts})
      });
    }
  };

};