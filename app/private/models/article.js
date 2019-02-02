var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
  title: 'string'
});

module.exports = mongoose.model('Article', ArticleSchema); 