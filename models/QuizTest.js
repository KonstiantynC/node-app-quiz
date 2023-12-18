const { Schema, model } = require('mongoose');


const QuizTest = new Schema({
  quesion: {
    type: String,
    unique: true,
    default: 'how much 2+2'
  },
  answer: {
      type: String,
      unique: true,
      isChecked: Boolean,
      default: '4 suka',
    },
  multiply: {
    type: Number,
    default: null
  }
});

module.exports = model('QuizTest', QuizTest);