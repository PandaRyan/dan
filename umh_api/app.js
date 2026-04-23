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
    console.error("Database connection failed! The exact error is:", err.message)
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

//route for stress test
app.get('/api/auth/signin', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running perfectly' });
});

app.post('/api/auth/signin', async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    //check user existence
    const user = await User.findOne({email: email})
    if (!user)
        return res.status(400).json({status: "failed", message: "User not found"})

    //check password
    const validUser = await bcrypt.compare(password, user.password)
    if (!validUser)
        return res.status(400).json({status: "failed", message: "Invalid Password"})

    const token = jwt.sign(
        { _id: user._id},
        process.env.TOKEN_SECRET,
        { expiresIn: '2h' }
    )

    res.status(200).json({status: "success", token: token, name: user.name, onboarding: user.onboarding})
});

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
