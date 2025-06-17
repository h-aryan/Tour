const express = require("express");
const userController = require("./../controllers/userControllers");
const router = express.Router();
const authController = require("./../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect); // Protect all routes after this middleware

router.patch("/updateMyPassword", authController.updatePassword);

router.get("/me", userController.getMe, userController.getUser);

router.patch("/updateMe", userController.updateUser);
router.delete("/deleteMe", userController.deleteUser);

router.use(authController.restrictTo("admin")); // Restrict all routes after this middleware

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
