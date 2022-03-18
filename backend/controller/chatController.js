const asyncHandler = require("express-async-handler");
const pool = require("../db");

const createConversation = asyncHandler(async (req, res) => {
  const { rows: adminUsers } = await pool.query(
    "SELECT id FROM users WHERE is_admin=$1",
    [true]
  );
  res.status(200).json(adminUsers);
  adminUsers.map(
    async (a) =>
      await pool.query(
        "UPDATE users SET conversation=$1 WHERE users.is_admin=$2",
        [a.id, false]
      )
  );
});
module.exports = { createConversation };
