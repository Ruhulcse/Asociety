const express = require("express");
const productController = require("../controller/productController");


const router = express.Router();
// get all routes qsfd
// router.post("/createProduct", productController.createProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.patch("/updateProduct/:id", productController.updateProduct);
router.get("/getProduct", productController.getProduct);
//router.post('/login',userController.login);
//   .get(userController.getAllUsers)

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
