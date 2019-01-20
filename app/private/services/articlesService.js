const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const filePath = './private/data/articlesData.json';

var service = {};

service.getArticles = async function() {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content);
    return result.articles;
}

service.getArticle = async function(id) {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content);
    return getArticleById(result.articles, id);
}

service.createArticle = async function(title) {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content);

    ++result.lastId;

    console.log(result);
    newArticle = {
        id: result.lastId,
        title: title
    }

    result.articles.push(newArticle);

    await writeFileAsync(filePath, JSON.stringify(result));
}

service.updateArticle = async function(id, title) {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content);
    let article = getArticleById(result.articles, id);
    article.title = title;
    await writeFileAsync(filePath, JSON.stringify(result));
}

service.deleteArticle = async function(id) {
    let content = await readFileAsync(filePath);
    let result = JSON.parse(content)
    for( var i = 0; i < result.articles.length; i++) {
        if ( result.articles[i].id == id) {
            result.articles.splice(i, 1);
            
        }
    }

    await writeFileAsync(filePath, JSON.stringify(result));
}

function getArticleById(articles, id) {
    return articles.find((element, index, array) => {
        if(element.id == id) {
            return element;
        }
    })
}

module.exports = service;