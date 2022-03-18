const asyncHandler = require("express-async-handler");
const pool = require("../db");

//POST complaint PRIVATE
const addComplaint = asyncHandler(async (req, res) => {
  const { rows: user } = await pool.query("SELECT * FROM users WHERE id=$1", [
    req.user_id,
  ]);
  const { description, topic, category_id, neighborhood_id, contact } =
    req.body;
  if (!description || !topic || !category_id || !neighborhood_id || !contact) {
    throw new Error("Please fill in all fields");
  }
  if (user[0].id) {
    if (contact) {
      const { rows: contact1 } = await pool.query(
        "INSERT INTO contact(email,phone) VALUES($1,$2) RETURNING *",
        [contact.email, contact.phone]
      );
      if (contact1[0].id) {
        const { rows: complaint } = await pool.query(
          "INSERT INTO complaint(description,category_id,neighborhood_id,users_id,contact_id,topic) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
          [
            description,
            category_id,
            neighborhood_id,
            user[0].id,
            contact1[0].id,
            topic,
          ]
        );
        res.json(complaint[0]);
      }
    }
  }
});

//GET complaints PRIVATE
const getComplaints = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  let page = Number(req.query.page);
  const {rows:count}=await pool.query('SELECT COUNT(id) FROM complaint WHERE complaint.users_id=$1 ',[user_id])
  let limit = 5;
  let pages = Math.ceil(count[0].count/limit)
  if(page>pages){
    page=pages
  }
  const endIndex = Math.abs((page - 1) * limit);
  // const {rows:complaints}=await pool.query("SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,row_to_json(s) AS sub_category  ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN sub_category s ON s.id=c.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE u.id=$1",[user_id])
  const { rows: complaints } = await pool.query(
    `SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE u.id=$1 ORDER BY c.id LIMIT ${limit} OFFSET ${endIndex}`,
    [user_id]
  );
  res.status(200).json({complaints,page,pages});
});

//DELETE complaintById PRIVATE
const deleteComplaintById = asyncHandler(async (req, res) => {
  complaint_id = req.params.id;
  const { rows: complaint } = await pool.query(
    "SELECT * FROM complaint WHERE id=$1",
    [complaint_id]
  );
  if (complaint.length > 0) {
    await pool.query("DELETE FROM complaint WHERE id=$1", [complaint_id]);
    res.status(200).json({ msg: "Deleted successfully" });
  } else {
    throw new Error("Complaint with that ID does not exist");
  }
});

//GET complaintById PRIVATE
const getComplaintById = asyncHandler(async (req, res) => {
  complaint_id = req.params.id;
  if (complaint_id) {
    const { rows: complaint } = await pool.query(
      "SELECT c.id,c.created_at,c.response,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
      [complaint_id]
    );
    if (complaint.users_id = req.user_id) {
      res.status(200).json(complaint[0]);
    } else {
      throw new Error("Access denied!");
    }
  } else {
    throw new Error("Complaint with that ID does not exist");
  }
});

const updateComplaint = asyncHandler(async (req, res) => {
  const complaint_id = req.params.id;
  const { description, topic, category_id, neighborhood_id, contact } =
    req.body;
  if (complaint_id) {
    const { rows: complaint } = await pool.query(
      "SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
      [complaint_id]
    );
    if (complaint.length == 0) {
      throw new Error("Complaint with that ID does not exist");
    } else if (complaint[0].user.id != req.user_id) {
      throw new Error("Access denied!");
    } else {
      const { rows: updatedComplaint } = await pool.query(
        "WITH contact AS ( UPDATE contact SET phone=$1,email=$2 WHERE id = (SELECT complaint.contact_id FROM complaint WHERE complaint.id=$3)) UPDATE complaint SET topic=$4,description=$5,category_id=$6,neighborhood_id=$7 WHERE complaint.id=$8 RETURNING * ",
        [
          contact.phone,
          contact.email,
          complaint_id,
          topic,
          description,
          category_id,
          neighborhood_id,
          complaint_id,
        ]
      );
      if (updatedComplaint.length > 0) {
        const { rows: updatedComplaintJSON } = await pool.query(
          "SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
          [complaint_id]
        );
        res.status(200).json(updatedComplaintJSON[0]);
      }
    }
  } else {
    throw new Error("Please provide an ID");
  }
});

//GET complaints ADMIN
const getComplaintsAdmin = asyncHandler(async (req, res) => {
  // const {rows:complaints}=await pool.query("SELECT c.id,c.created_at,c.is_replied,c.topic,c.img,c.replied_at,c.description,row_to_json(s) AS sub_category  ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN sub_category s ON s.id=c.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE u.id=$1",[user_id])
  let page = Number(req.query.page);
  const {rows:count}=await pool.query('SELECT COUNT(id) FROM complaint')
  let limit = 5;
  let pages = Math.ceil(count[0].count/limit)
  if(page>pages){
    page=pages
  }
  const endIndex = (page - 1) * limit;
  const { rows: complaints } = await pool.query(
    `SELECT c.id,c.created_at,c.response,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id ORDER BY c.id LIMIT ${limit} OFFSET ${endIndex}`
  );
  res.status(200).json({pages,page,complaints});
});
//GET complaintById ADMIN
const getComplaintByIdAdmin = asyncHandler(async (req, res) => {
  complaint_id = req.params.id;
  if (complaint_id) {
    const { rows: complaint } = await pool.query(
      "SELECT c.id,c.created_at,c.response,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
      [complaint_id]
    );
    res.status(200).json(complaint[0]);
  } else {
    throw new Error("Complaint with that ID does not exist");
  }
});
//PUT complaint Response ADMIN
const complaintRespondAdmin = asyncHandler(async (req, res) => {
  const response = req.body.response;
  const id = req.params.id;
  let yourDate = new Date()
const today=yourDate.toISOString().split('T')[0].slice(0,10)

  console.log(today,id,response)
  const { rows: complaint } = await pool.query(
    "UPDATE complaint SET response=$1,replied_at=$2 ,is_replied=$3WHERE id=$4 RETURNING *",
    [response, today,true,id]
  );
  if (complaint.length > 0) {
    const { rows: updatedComplaintJSON } = await pool.query(
      "SELECT c.id,c.created_at,c.response,c.is_replied,c.topic,c.img,c.replied_at,c.description,json_build_object('id',s.id,'name',s.name,'category',category.name) AS sub_category ,row_to_json(n) AS neighborhood,row_to_json(u) AS user,row_to_json(con) AS contact FROM complaint c JOIN (SELECT sub_category.id,sub_category.name,sub_category.category_id FROM sub_category) s ON s.id=c.category_id JOIN category ON category.id=s.category_id JOIN neighborhood n ON n.id=c.neighborhood_id JOIN (SELECT users.id,users.first_name,users.last_name,users.is_admin,users.email FROM users) u ON u.id=c.users_id JOIN contact con ON con.id=c.contact_id WHERE c.id=$1",
      [id]
    );
    console.log(updatedComplaintJSON[0])
    res.status(200).json(updatedComplaintJSON[0]);
  }
});
module.exports = {
  addComplaint,
  updateComplaint,
  getComplaints,
  deleteComplaintById,
  getComplaintById,
  getComplaintsAdmin,
  getComplaintByIdAdmin,
  complaintRespondAdmin
};
