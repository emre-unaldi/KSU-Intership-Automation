const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoDB = require('./helper/mongoDB');
const recaptchaRouter = require('./routes/recaptcha.routes');
const userRoutes = require('./routes/user.routes');
const internshipRoutes = require('./routes/internship.routes');

const app = express();

// dotenv
dotenv.config();

// cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

// Database 
mongoDB();

app.use(logger('dev'));

// Parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/recaptcha', recaptchaRouter);
app.use('/api/users', userRoutes);
app.use('/api/internship', internshipRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`The server is started on port ${PORT}.`);
});

module.exports = app;
