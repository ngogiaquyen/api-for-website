const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const auth = require("~/middleware/auth");

router.get("/", controller.getUser);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", auth, controller.profile);

module.exports = router;
