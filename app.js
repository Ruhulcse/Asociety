const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express()
 


// Routers
//const productRouter = require('./routes/productRoutes');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRouter");
const projectRouter = require("./routes/proejctRouter");
const newsRouter = require("./routes/newsRouter");
const { google } = require("googleapis");
// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use(express.static('images'));
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); 

  next();
});

// 3) ROUTES
app.use("/api/v1/product", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects",projectRouter)
app.use("/api/v1/news",newsRouter)
// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `can't find ${req.originalUrl} on the server`,
//   });
// });
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// exports
module.exports = app;
