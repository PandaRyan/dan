require('dotenv').config()

const createError = require('http-errors');

const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("DB Connected successfully")
  } catch (err) {
    console.error("Database connection failed")
    process.exit(1)
  }
}
connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500).json({
    message:err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});

module.exports = app;
