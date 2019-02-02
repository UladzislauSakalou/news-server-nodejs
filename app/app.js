const fs = require('fs');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userController = require('./private/controllers/usersController');
const session = require("express-session")

passport.use(new LocalStrategy(
    function (username, password, cb) {
        return userController.findUser(username, password, cb);
    }));

    // passport.use(new FacebookStrategy({
    //     clientID: '[FBID]',
    //     clientSecret: '[FBSECRET]',
    //     callbackURL: 'https://127.0.0.1:'+port+'/facebook-token'
    //   },
    //   function(accessToken, refreshToken, profile, done) {
    //     process.nextTick(function () {
    //       return done(null, profile);
    //     });
    //   }
    // ));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const userRouter = require('./routes/user');
const articlesRouter = require('./routes/articles');

const app = express();

app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/articles');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('common', {
    stream: fs.createWriteStream('./requests.log', { flags: 'a' })
}));

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
// app.use('/', indexRouter);
app.use('/articles', articlesRouter);

app.use(function (error, req, res, next) {
    res.json({ message: error.message });
});

module.exports = app;
