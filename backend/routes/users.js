const express = require("express");
const route = express.Router();
const {
  login,
  register,
  getProfile,
  updateProfile,
  getProfilesAdmin,
  deleteProfileAdmin,
  getProfileAdmin,
  updateProfileAdmin,
  getUserStatistics
} = require("../controller/userController");
const protect = require("../middleware/protect");
const protectAdmin = require("../middleware/protectAdmin");
const { body, validationResult, check } = require("express-validator");


route.post(
  "/login",
  check("email").isEmail().withMessage("Please use an Email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 char"),
  login
);


route.post(
  "/register",
  check("email").isEmail().withMessage("Please use an Email"),
  check("password1")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 char"),
  register
);
route.get("/profile", protect, getProfile);
route.get("/admin/profiles", protectAdmin, getProfilesAdmin);
route.get("/admin/profile/:id", protectAdmin, getProfileAdmin);
route.put("/profile/update", protect, updateProfile);
route.delete("/admin/profile/delete/:id", protectAdmin, deleteProfileAdmin);
route.put("/admin/profile/update/:id", protectAdmin, updateProfileAdmin);
route.get("/admin/statistics", protectAdmin, getUserStatistics);

module.exports = route;
