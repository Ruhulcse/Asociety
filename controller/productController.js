const product = require("../model/ProductModel");
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const request = require("request");
const { file } = require("googleapis/build/src/apis/file");
var fs = require("fs");
// token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSecert, {
    expiresIn: "100m",
  });
};

// creating product function
exports.createProduct = catchAsync(async (req, res) => {
  try {
    const userProduct = await product.findOne({
      userIdentifer: req.body.userIdentifer,
    });
    if (!userProduct) {
      const newProduct = await product.create(req.body);
      // const newUser = await User.create(req.body);
      // const token = signToken(newUser._id);
      //|| newUser != null
      if (newProduct != null) {
        return res.json({
          message: "Success",
          // token,
          Productbody: newProduct,
          // userBody: newUser,
        });
      }
    } else {
      const newProduct = await product.create(req.body);
      if (newProduct != null) {
        return res.json({
          message: "Success",
          Productbody: newProduct,
        });
      }
    }
  } catch (Erro) {
    console.log(Erro);
    res.status(400).json({
      status: "Failed",
      message: Erro,
    });
  }
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  // get the id from the user firdt
  const productId = console.log("Hi before deleting product", productId);
  try {
    const productId = await product.findByIdAndDelete(req.params.id);
    if (!productId) {
      res.status(404).json({
        message: "No product found with the given id ",
        body: "There is no such a product or prooduct already delete it",
      });
      //    return next(new AppError('No product found with that ID', 404));
    } else {
      res.json({
        status: "success",
        message: "Product has delected Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// Update Products
exports.updateProduct = catchAsync(async (req, res, next) => {
  // get the id from the user firdt
  console.log("Hi before ");

  try {
    const productId = await product.findByIdAndUpdate(req.params.id);
    if (!productId) {
      res.status(404).json({
        message: "No product found with the given id ",
        body: "There is no such a product or prooduct already delete it",
      });
      //    return next(new AppError('No product found with that ID', 404));
    } else {
      res.json({
        status: "success",
        message: "Product has update Successfully",
        result: productId,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get all the products , make it public
exports.getProduct = catchAsync(async (req, res, next) => {
  // get all the products
  try {
    console.log("hi before sending", req.requestTime);
    const mAllProduct = await product.find(req.body);
    res.status(200).json({
      status: "success",
      ProductList: mAllProduct.length,
      products: {
        mAllProduct,
      },
    });
  } catch (error) {
    res.json({
      Error: res.json({
        error: error,
      }),
    });
  }

  // update products
});

// get single product
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const item = await product.findById(req.params.id);
    console.log(item);
    if (item == null) {
      res.status(404);
      res.send("news not found");
    } else {
      res.json(item);
    }
  } catch (error) {
    res.json({ message: error });
  }
});

exports.getEmailProduct = catchAsync(async (req, res, next) => {
  console.log(req.params.email);
  let email = req.params.email;
  console.log(email);
  try {
    const item = await product.find({ userIdentifer: email });
    console.log(item);
    if (item == null) {
      res.status(404);
      res.send("news not found");
    } else {
      res.json(item);
    }
  } catch (error) {
    res.json({ message: error });
  }
});
