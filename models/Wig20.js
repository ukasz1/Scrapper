const mongoose = require('mongoose');

const Wig20Schema = new mongoose.Schema({
  time: Number,
  value: Number
});

module.exports = mongoose.model('wig20', Wig20Schema);