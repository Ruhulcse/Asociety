const { promisify } = require("util");
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

// creating tour function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSecert, {
    expiresIn: "9m",
  });
};

exports.createUser = catchAsync(async (req, res) => {
  console.log(req.body);

  try {
    const newUser = await User.create(req.body); /// ger all the body request and pass it to the database
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success messsgea ",
      token,
      data: {
        User: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      ErrorMessage: "User already exists Or passoeed",
      Reason: err,
    });
  }
});
// get users (Admin Function)

// login
exports.login = catchAsync(async (req, res, next) => {
  // next work as a middle
  // get email Address and password
  try {
    const { userIdentifer, password } = req.body;
    if (!userIdentifer || !password) {
      res.status(400).json({
        status: "Failed",
        ErrorMessage: "Email address or password is not founded ",
        mesasge: Error,
      });
    }
    const user = await User.findOne({ userIdentifer }).select("+password");
    // check if email address and password is correct
    // if everythig is okay send toke
    // pass the passwrd and the hash password too
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "Failed",
        ErrorMessage: "Incorrect email or password",
      });
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "success login ",
      token: token,
      user: user,
    });
  } catch (Error) {
    res.status(400).json({
      status: "Failed",
      ErrorMessage: "Email address or password is wrong",
      mesasge: Error,
    });
  }
});

// geting  users
exports.Users = catchAsync(async (req, res) => {
  // get all the users
  console.log("Hi before getting user's object");
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const mUser = await User.find(req.body);
    if (!mUser) {
      res.json.status(200)({
        message: "No User's found",
      });
    } else {
      res.json({
        NumberOfUsers: mUser.length,
        Users: mUser,
      });
    }
  } catch (Error) {
    res.status(400).json({
      status: "Failed",
      mesasge: Error,
    });
  }
});
// delete users
exports.deleteUser = catchAsync(async (req, res) => {
  console.log("Hi from deleting user function");
  const mDeletByID = await User.findByIdAndDelete(req.params.id);
  console.log(mDeletByID);
  if (!mDeletByID) {
    res.json({
      status: "Faild",
      message: "There is no such an ID",
    });
  }
  res.json({
    mesasge: "User has deleted",
  });
});

// Update users
exports.updateUser = catchAsync(async (req, res) => {
  console.log("Hi from update user function");
  const updateBYid = await User.findByIdAndUpdate(req.params.id);
  console.log(updateBYid);
  if (!updateBYid) {
    res.json({
      status: "Faild",
      message: "There is no such an ID",
    });
  }
  res.json({
    mesasge: "User has updated",
    user: {
      User: updateBYid,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Login is required here", 401));
    // res.status(401).json({
    //   status: "Failed",
    //   message: "Login is required",
    // });
  }

  // verify token
  const decode = await promisify(jwt.verify)(token, process.env.JWTSecert);
  // check if user still exists

  const freshUser = await User.findById(decode.id);
  console.log("Id is ", freshUser);
  if (!freshUser) {
    return next(new AppError("The user is not exists  ", 401));
  }

  // check if the user has change his password
  

  next();
});
