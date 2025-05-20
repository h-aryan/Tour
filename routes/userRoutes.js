const express = require("express");
const userController = require("./../controllers/userControllers");
const router = express.Router();
const authController = require("./../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.patch("/updateMe", authController.protect, userController.updateUser);
router.delete("/deleteMe", authController.protect, userController.deleteUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
