const express = require("express");
const app = express();
const pool = require("./db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path=require('path')
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", require("./routes/users"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/category", require("./routes/category"));
app.use("/api/neighborhood", require("./routes/neighborhood"));
app.use("/api/complaint", require("./routes/complaint"));
app.use('/api/upload',require('./routes/uploadRoutes'))

const directory= path.join(__dirname, '..','/upload');
app.use('/upload', express.static(directory));
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 401;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    msg: error.message,
  });
});
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on ${port}`);
});
