require('dotenv').config()

const createError = require('http-errors');
const cors = require('cors');

const express = require('express');
const app = express();

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

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeader: ['Content-Type', 'Authorization']
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
const authRouter = require('./routes/auth');
const newsRouter = require('./routes/news');
const subsidyRouter = require('./routes/subsidy');

app.use('/api/news', newsRouter);
app.use('/api/auth', authRouter)
app.use('/api/subsidy', subsidyRouter);

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
