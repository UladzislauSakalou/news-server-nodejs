var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
  title: 'string',
  urlToImage: 'string',
  content: 'string'
});

module.exports = mongoose.model('Article', ArticleSchema); 