const express = require('express');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/signup',userController.createUser);
router.post('/login',userController.login);
router.post('/Users',userController.Users);
router.delete('/deleteUser/:id', userController.deleteUser);
  //   .get(userController.getAllUsers)

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
