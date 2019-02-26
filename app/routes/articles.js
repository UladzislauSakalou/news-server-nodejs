var express = require('express');
var router = express.Router();
var articlesController = require('../private/controllers/articlesController');

router.get('/', articlesController.getArticles);

router.get('/:id', articlesController.getArticle);

router.post('/', articlesController.createArticle);

router.put('/:id', articlesController.updateArticle);

router.delete('/:id', articlesController.deleteArticle);

// router.put('/:id', checkAuthentication, articlesController.updateArticle);

// router.delete('/:id', checkAuthentication, articlesController.deleteArticle);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/users/login");
    }
}

module.exports = router;
