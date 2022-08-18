const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
require('../public/javascript/loginGoogle');

//session
const session = require('express-session');
const localsCheck = require('./middlewares/localsCheck');
const cookieCheck = require('./middlewares/cookieCheck');

//routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact')
// routes api
const indexRouterApi = require('./routes/api/index');
const productsRouterApi = require('./routes/api/product');
const usersRouterApi = require('./routes/api/users');


// view engine setup
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'ViveBio proyect',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));
app.use(cookieCheck);
app.use(localsCheck);


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

app.use('/api', indexRouterApi);
app.use('/api/products', productsRouterApi);
app.use('/api/users', usersRouterApi);

/* PASSPORT GOOGLE*/

/* const passport = require('passport'); */


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));
  

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.email}`)
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

/* END GOOGLE SIGN IN */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;