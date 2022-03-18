const express = require("express");
const route = express.Router();
const protect = require("../middleware/protect");
const { createConversation } = require("../controller/chatController");
route.get("/create", protect, createConversation);
module.exports = route;
