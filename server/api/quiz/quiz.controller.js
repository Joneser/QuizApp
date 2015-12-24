'use strict';

var _ = require('lodash');
var Quiz = require('./quiz.model');

function handleError(res, err) {
  return res.send(500, err);
}


/**
 * This create function checks if a quiz already exists for the user, if so it updates the one that exists, otherwise creates a new one.
 */
exports.create = function(req, res) {
  
  Quiz.update({user: req.body.user}, {$set: { answers: req.body.answers }}, function(err, quiz) {
    if(err) {
      return handleError(res, err);
    }
    if(!quiz) {
      Quiz.create(req.body, function(err, createdQuiz) {
          if(err) { 
            return handleError(res, err); 
          }
          return res.json(201, createdQuiz);
        });
    } else {
          return res.json(201, quiz);
    }
    

  });
  
};

// Get a single thing
exports.show = function(req, res) {
  console.log(req);
  Quiz.findOne({user: req.query.email}, function (err, quiz) {
    if(err) { return handleError(res, err); }
    if(!quiz) { return res.send(404); }
    return res.json(quiz);
  });
};