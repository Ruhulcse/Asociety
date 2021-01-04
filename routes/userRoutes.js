const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();
router.route("/Users").get(userController.protect, userController.Users);
console.log(userController.protect);

router.post("/signup", userController.createUser);
router.post("/login", userController.login);
//router.get('/Users',userController.Users);
router.delete("/deleteUser/:id", userController.deleteUser);
router.patch("/update/:id", userController.updateUser);

//   .get(userController.getAllUsers)

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
