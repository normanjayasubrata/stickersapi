require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const passport = require("../config/passport");

//import route
const stickerRouter = require("./stickers/router");
const accountRouter = require("./accounts/router");

const app = express();

app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//welcome route

app.get("/", (req, res) => {
  res.send("Welcome to Norman's Stickers API")
})

//use route
app.use("/api/v1/stickers", stickerRouter);
app.use("/api/v1/accounts", accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // Passing the error JSON
  res.status(err.status || 400);
  res.json({
    error: req.app.get('env') === 'development' ? err : {},
    message: err.message
  })
});

module.exports = app;
