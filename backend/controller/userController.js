const bcrypt = require("bcrypt");
const saltRounds = 10;
const pool = require("../db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { query } = require("express");
//POST login
const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array().map((x) => x.msg) });
  }
  const email = req.body.email;
  const password = req.body.password;
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (user.rows.length == 0) {
    throw new Error("Invalid Credentials");
  }
  const userPassword = user.rows[0].password;
  const match = await bcrypt.compare(password, userPassword);
  if (match) {
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const { password, ...rest } = user.rows[0];
    return res.status(200).json({ ...rest, token });
  } else {
    throw new Error("Invalid Credentials");
  }
});
//POST register user
const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ msg: errors.array().map((x) => x.msg) });
  }
  const email = req.body.email;
  const password1 = req.body.password1;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  if (!email || !password1 || !first_name || !last_name) {
    throw new Error("Please fill in all fields");
  }
  const exist = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (exist.rows.length > 0) {
    throw new Error("User with that ID already exists");
  }
  const encryptedPassword = await bcrypt.hash(password1, saltRounds);
  const newUser = await pool.query(
    "INSERT INTO users(first_name,last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
    [first_name, last_name, email, encryptedPassword]
  );
  //create conv with admins

  const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  const { password, ...rest } = newUser.rows[0];
  res.json({ ...rest, token });
});
//GET profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1 ORDER BY id", [
    req.user_id,
  ]);
  delete user.rows[0].password;
  res.json(user.rows[0]);
});

//GET profiles ADMIN
const getProfilesAdmin = asyncHandler(async (req, res) => {
  let page = Number(req.query.page);
  const { rows: count } = await pool.query("SELECT COUNT(id) FROM users");
  let limit = 5;
  let pages = Math.ceil(count[0].count / limit);
  if (page > pages) {
    page = pages;
  }
  const endIndex = (page - 1) * limit;
  const { rows: users } = await pool.query(
    `SELECT id,first_name,last_name,is_admin,email FROM users ORDER BY id LIMIT ${limit} OFFSET ${endIndex}`
  );
  res.status(200).json({ pages, page, users });
});

//DELETE profiles ADMIN
const deleteProfileAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { rows: deletedComplaint } = await pool.query(
    "DELETE FROM complaint WHERE complaint.users_id=$1 RETURNING * ",
    [id]
  );
  if (deletedComplaint.length > 0) {
    const { rows: deletedUser } = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    if (deletedUser.length > 0) {
      res.status(200).json({ msg: "User deleted successfully!" });
    } else {
      throw new Error("User with that ID does not exist");
    }
  } else {
    const { rows: deletedUser } = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    if (deletedUser.length > 0) {
      res.status(200).json({ msg: "User deleted successfully!" });
    } else {
      throw new Error("User with that ID does not exist");
    }
  }
});

//GET profile ADMIN
const getProfileAdmin = asyncHandler(async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1", [
    req.params.id,
  ]);
  delete user.rows[0].password;
  res.json(user.rows[0]);
});
//PUT profile ADMIN
const updateProfileAdmin = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, is_admin } = req.body;
  if (!first_name || !last_name || !email) {
    throw new Error("Please provide all fields");
  }
  const duplicate = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (duplicate.rows[0] && duplicate.rows[0].id != req.params.id) {
    throw new Error("That email is already taken");
  }
  const user = await pool.query(
    "UPDATE users SET first_name=$1,last_name=$2,email=$3,is_admin=$4 WHERE id=$5 RETURNING *",
    [first_name, last_name, email, is_admin, req.params.id]
  );
  res.status(200).json(user.rows[0]);
});
//PUT profile
const updateProfile = asyncHandler(async (req, res) => {
  const { first_name, last_name, password, email } = req.body;
  if (!first_name || !last_name || !email) {
    throw new Error("Please provide all field");
  }
  const duplicate = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (duplicate.rows[0] && duplicate.rows[0].id != req.user_id) {
    throw new Error("That email is already taken");
  }
  if (password) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const user = await pool.query(
      "UPDATE users SET first_name=$1,last_name=$2,email=$3,password=$4 WHERE id=$5 RETURNING *",
      [first_name, last_name, email, encryptedPassword, req.user_id]
    );
    res.status(200).json(user.rows[0]);
  } else {
    const user = await pool.query(
      "UPDATE users SET first_name=$1,last_name=$2,email=$3 WHERE id=$4 RETURNING *",
      [first_name, last_name, email, req.user_id]
    );
    res.status(200).json(user.rows[0]);
  }
  res.status(200).json(user.rows[0]);
});
//GET statistics in user BY ADMIN
const getUserStatistics = asyncHandler(async (req, res) => {
  const time = req.query.time;
  if (time == "month") {
    const { rows: data } = await pool.query(
      " select date_trunc('month',registered_at) as user_to_month,count(id) as count from users group by date_trunc('month',registered_at)"
    );
    res.status(200).json({ data, time: "mounth" });
  } else if (time == "hour") {
    const { rows: data } = await pool.query(
      " select date_trunc('hour',registered_at) as user_to_hour,count(id) as count from users group by date_trunc('hour',registered_at)"
    );
    res.status(200).json({ data, time: "hour" });
  } else {
    throw new Error("Server Error");
  }
});
module.exports = {
  login,
  register,
  getProfile,
  updateProfile,
  getProfilesAdmin,
  deleteProfileAdmin,
  getProfileAdmin,
  updateProfileAdmin,
  getUserStatistics,
};
