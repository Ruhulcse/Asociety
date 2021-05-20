const { promisify } = require("util");
const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const multer = require("multer");
const { google } = require("googleapis");
const multerStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "images");
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    callBack(null, `user-${req.body.id}-${Date.now()}.${ext}`);
  },
});

const multerFiler = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new AppError("not image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFiler,
});
exports.uploadUserPhoto = upload.single("imageCover");

// creating tour function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSecert, {
    expiresIn: "100m",
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
    const { email, password } = req.body;
    // if (!email || !password) {
    //   res.status(400).json({
    //     status: "Failed",
    //     ErrorMessage: "Email address or password is not founded ",
    //     mesasge: Error,
    //   });
    // }
    const user = await User.findOne({ email }).select("+password");
    // check if email address and password is correct
    // if everythig is okay send toke
    // pass the passwrd and the hash password too
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.send("wrong");
    } else {
      const token = signToken(user._id);
      res.status(200).json({
        status: "success login ",
        token: token,
        user: user,
      });
    }
  } catch (Error) {
    res.send("bad");
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

exports.googleAuth = catchAsync(async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );
});

// Update users
exports.updateUser = catchAsync(async (req, res) => {
  console.log("Hi from update user function");
  console.log(req.file);
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
  if (freshUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError("User recently changed password please loogin again   ", 401)
    );
  }

  req.user = freshUser;

  next();
});
// resterct to certin user
exports.restrictTo = (...roles) => {
  // roles is an array that cantines the name of the user roles
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return next(new AppError("You do not have a permission   ", 403));
    }

    next();
  };
};
/// forget password
exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on the email
  const user = await User.findOne({ userIdentifer: req.body.userIdentifer });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({
    resetToke: resetToken,
    validateBeforeSave: false,
  });

  // res.json({
  //   message: user,
  // });
  //next();
});
// reset password
exports.resetPassword = (req, res, next) => {};

//git testing
