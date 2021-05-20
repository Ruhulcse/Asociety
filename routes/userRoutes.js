const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();
router
  .route("/Users")
  .get(
    // userController.protect,
    // userController.restrictTo("ADMIN"),
    userController.Users
  );
console.log(userController.protect);

router.post("/signup", userController.createUser);
router.post("/login", userController.login);

router.post("/forgetPassword", userController.forgetPassword);
router.post("/resetPassword", userController.resetPassword);
// delete
router.delete("/deleteUser/:id", userController.deleteUser);
router.patch(
  "/update/:id",
  userController.uploadUserPhoto,
  userController.updateUser
);

//   .get(userController.getAllUsers)

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
