const express = require("express");
const router = express();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", authController.protectMiddleware, userController.getAlluser);
router.get(
  "/:id",
  authController.protectMiddleware,
  userController.getSingleUser
);
router.put("/:id", authController.protectMiddleware, userController.updateUser);

module.exports = router;
