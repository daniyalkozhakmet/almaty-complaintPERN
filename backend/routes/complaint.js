const express = require("express");
const route = express.Router();
const protect = require("../middleware/protect");
const protectAdmin = require("../middleware/protectAdmin");
const {
  addComplaint,
  updateComplaint,
  getComplaints,
  deleteComplaintById,
  getComplaintById,
  getComplaintsAdmin,
  getComplaintByIdAdmin,
  complaintRespondAdmin
} = require("../controller/complaintController");
route.post("/add", protect, addComplaint);
route.get("/get", protect, getComplaints);
route.get("/get/admin", protectAdmin, getComplaintsAdmin);
route.get("/get/:id", protect, getComplaintById);
route.get("/get/admin/:id", protectAdmin, getComplaintByIdAdmin);
route.delete("/delete/:id", deleteComplaintById);
route.put("/update/:id", protect, updateComplaint);
route.put("/update/admin/:id", protectAdmin, complaintRespondAdmin);

module.exports = route;
