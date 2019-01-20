const fs = require('fs');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');

const app = express();

app.use(logger('common', {
    stream: fs.createWriteStream('./requests.log', {flags: 'a'})
}));

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/articles', articlesRouter);

app.use(function(error, req, res, next) {
    // Will **not** get called. You'll get Express' default error
    // handler, which returns `error.toString()` in the error body
    console.log('will not print');
    res.json({ message: error.message });
  });

module.exports = app;
