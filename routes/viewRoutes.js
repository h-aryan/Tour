const express = require("express");
const view = require("../controllers/viewController"); // Import the overview controller

const router = express.Router();

router.get("/", view.getOverview);

router.get("/tour/:id", view.getTour);

module.exports = router;
