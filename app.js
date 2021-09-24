const express = require('express');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
require("dotenv").config();

const movieRouter = require("./routes/movieRoute");
const commentRouter = require("./routes/commentRoute");
const sequelize = require('./utils/database');
const Comment = require('./models/commentModel');
const HttpError = require("./models/httpError");

const app = express()

//set Security http headers
app.use(helmet());

//set maximum amount of limit request from an ip address in an hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!'
});

app.use("/api", limiter);

//Data Sanitization against XSS i.e html codes
app.use(xss());

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true }));

/// Allow CORS ////
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/// API ROUTES///
app.use('/api/movies', movieRouter);
app.use('/api/comments', commentRouter);

////HANDLING ERROR ROUTES//////
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);

    throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured",
  });
});

(async () => {
    try {
        await sequelize.sync(
          {force: false}  
        );
        app.listen(process.env.PORT || 5000, (req, res) => {
            console.log(`Server started on port 5000`);
        });
    } catch (error) {
        console.error(error);
    }
})()
