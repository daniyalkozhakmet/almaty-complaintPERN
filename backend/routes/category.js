const express = require("express");
const route = express.Router();
const {
  getCategory,
  addCategory,
  addSubCategory,
  deleteSubCategory,
  deleteCategory,
  getStatisticsCategory
} = require("../controller/categoryController");
const protectAdmin = require("../middleware/protectAdmin");
route.get("/", getCategory);
route.get("/statistics", getStatisticsCategory);
route.post("/add", protectAdmin, addCategory);
route.delete("/delete/:id", protectAdmin, deleteCategory);
route.post("/sub/add", protectAdmin, addSubCategory);
route.delete("/sub/delete/:c_id/:s_id", protectAdmin, deleteSubCategory);

module.exports = route;
