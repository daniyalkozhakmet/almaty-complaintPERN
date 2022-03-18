const express = require("express");
const route = express.Router();
const protectAdmin = require("../middleware/protectAdmin");
const {
  getNeighborhood,
  addNeighborhood,
  deleteNeighborhood,
} = require("../controller/neighborhood");
route.get("/", getNeighborhood);
route.post("/add", protectAdmin, addNeighborhood);
route.delete("/delete/:id", protectAdmin, deleteNeighborhood);

module.exports = route;
