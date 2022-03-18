const asyncHandler = require("express-async-handler");
const pool = require("../db");

//GET all categories with subCategories
const getCategory = async (req, res) => {
  const { rows: category } = await pool.query(
    "SELECT c.id,c.name AS category,array_to_json(array_agg(row_to_json(s))) AS sub_categories from (SELECT id,name AS sub_category, category_id from sub_category) s RIGHT JOIN category c ON c.id=s.category_id GROUP BY c.id ORDER BY c.id"
  );
  res.status(200).json(category);
};

//POST category PRIVATE
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const add = await pool.query(
    "INSERT INTO category(name) VALUES($1) RETURNING * ",
    [name]
  );
  const id = add.rows[0].id;
  const getting = async (id) => {
    const { rows: category } = await pool.query(
      "SELECT category.id , category.name AS category ,json_build_object('sub_categories',json_agg(s)) as sub_categories FROM category LEFT JOIN sub_category s ON category.id=s.category_id WHERE category.id=$1 GROUP BY category.id",
      [id]
    );
    res.status(200).json(category[0]);
  };
  if (id) {
    getting(id);
  }
});

//POST subCategory PRIVATE
const addSubCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { category_id: id } = req.body;
  if (!id || !name) {
    throw new Error("Please provide all fields");
  }
  const category = await pool.query("SELECT * FROM category WHERE id=$1", [id]);
  if ((category.rows.length = 0)) {
    throw new Error("Category with that ID does not exist");
  }
  const subCategory = await pool.query(
    "INSERT INTO sub_category(category_id,name) VALUES($1,$2) RETURNING * ",
    [id, name]
  );
  const getting = async (id) => {
    const { rows: category } = await pool.query(
      "SELECT c.id,c.name AS category,array_to_json(array_agg(row_to_json(s))) AS sub_categories from (SELECT id,name AS sub_category, category_id from sub_category) s RIGHT JOIN category c ON c.id=s.category_id WHERE c.id=$1 GROUP BY c.id",
      [id]
    );
    res.status(200).json(category[0]);
  };
  if (subCategory.rows) {
    getting(id);
  }
});

//delete subCategory PRIVATE
const deleteSubCategory = asyncHandler(async (req, res) => {
  const c_id = req.params.c_id;
  const s_id = req.params.s_id;
  if (!c_id || !s_id) {
    throw new Error("Please provide sub category ID");
  } else {
    await pool.query("DELETE FROM sub_category WHERE id=$1", [s_id]);
  }
  const getting = async (id) => {
    const { rows: category } = await pool.query(
      "SELECT c.id,c.name AS category,array_to_json(array_agg(row_to_json(s))) AS sub_categories from (SELECT id,name AS sub_category, category_id from sub_category) s RIGHT JOIN category c ON c.id=s.category_id WHERE c.id=$1 GROUP BY c.id ",
      [id]
    );

    res.status(200).json(category[0]);
  };
  getting(c_id);
});

//delete Category PRIVATE
const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id)
  if (!id) {
    throw new Error("Please provide category ID");
  }
  const { rows: cat } = await pool.query("SELECT * FROM category WHERE id=$1", [
    id,
  ]);
  if (cat.length == 0) {
    throw new Error("Category with that ID does not exist");
  } else {
    const {rows:deletedComplaint}=await pool.query("DELETE FROM complaint WHERE complaint.category_id=(SELECT DISTINCT id FROM sub_category WHERE sub_category.category_id=$1) RETURNING *", [id]);
    await pool.query("DELETE FROM sub_category WHERE category_id=$1", [id]);
    await pool.query("DELETE FROM category WHERE id=$1", [id]);
    res.status(200).json({ msg: "Deleted successfully!" });
  }
});

//GET statistics Category PRIVATE
const getStatisticsCategory = asyncHandler(async (req, res) => {
const {rows:data}=await pool.query('select c.name,count(c.id) from complaint com JOIN sub_category s ON s.id=com.category_id JOIN category c ON c.id=s.category_id GROUP BY c.id,c.name')
res.status(200).json(data)
});
module.exports = {
  getCategory,
  addCategory,
  addSubCategory,
  deleteSubCategory,
  deleteCategory,
  getStatisticsCategory
};
