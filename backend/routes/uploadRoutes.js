const express = require("express");
const pool = require("../db");
const multer = require("multer");
const path = require("path");
const route = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

route.post("/:id", upload.single("image"), async (req, res) => {
  const imgURL = "/" + req.file.path;
  const { rows: complaint } = await pool.query(
    "UPDATE complaint SET img=$1 WHERE id=$2",
    [imgURL, req.params.id]
  );
  if (complaint.length > 0) {
    const { rows: complaint2 } = await pool.query(
      "SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
      [id]
    );
    res.status(200).send(`/${req.file.path}`);
  }
  console.log(req.file.path);
  res.send(`/${req.file.path}`);
});
module.exports = route;
