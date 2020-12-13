const express = require('express');
const morgan = require('morgan');
const app = express();

// Routers 
//const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRouter');
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());


app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/product', productRouter);
app.use('/api/v1/users', userRouter);

// exports 
module.exports = app;
