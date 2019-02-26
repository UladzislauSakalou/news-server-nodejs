const Article = require('../models/article');

var service = {};

service.getArticles = async function() {
    return await Article.find();
}

service.getArticle = async function(id) {
    return await Article.findById(id);
}

service.createArticle = async function(title, urlToImage, content) {
    const article = new Article({ title: title, urlToImage: urlToImage, content: content });

    await article.save(function(err){
        if (err) {
            next(err);
        }
    });
}

service.updateArticle = async function(id, title, urlToImage, content) {
    return await Article.findByIdAndUpdate(id, { title: title, urlToImage: urlToImage, content: content }, function(err) {
        if (err) {
            console.log(err);
            next(err);
        }
    })
}

service.deleteArticle = async function(id) {
    return await Article.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log(err);
            next(err);
        }
    })
}

module.exports = service;