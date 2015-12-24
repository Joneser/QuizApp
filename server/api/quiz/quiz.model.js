'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuizSchema = new Schema({
  user: String,
  answers: {type: [{question: String, userAnswer: String, correctAnswer: String}], default: []}
});

QuizSchema.index({ user: 1, type: -1 });

module.exports = mongoose.model('Quiz', QuizSchema);