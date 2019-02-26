let articleService = require('../services/articlesService')
let controller = {};

controller.getArticles = function (req, res, next) {
    articleService.getArticles()
        .then(articles => {
            res.send(articles);
        });
}

controller.getArticle = function (req, res, next) {
    articleService.getArticle(req.params.id)
        .then(article => {
            res.send(article);
        });
}

controller.createArticle = function (req, res, next) {
    articleService.createArticle(req.body.title, req.body.urlToImage, req.body.content)
        .then(() => {
            res.status(200).send({message: "Article created"});
        });
}

controller.updateArticle = function (req, res, next) {
    articleService.updateArticle(req.params.id, req.body.title, req.body.urlToImage, req.body.content)
        .then(() => {
            res.status(200).send({message: "Article updated"});
        });
}

controller.deleteArticle = function (req, res, next) {
    articleService.deleteArticle(req.params.id)
        .then(() => {
            res.status(200).send({message: "Article deleted"});
        });
}

module.exports = controller