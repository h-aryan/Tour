const express = require("express");
const view = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", view.getOverview);
router.get("/tour/:id", view.getTour);
router.get("/login", view.getLoginForm);
router.get("/me", authController.protect, view.getAccount);

module.exports = router;
