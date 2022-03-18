const jwt=require('jsonwebtoken')
const pool=require('../db')
const asyncHandler = require("express-async-handler");
const protect=asyncHandler(async(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token || !token.startsWith('Bearer')){
        throw new Error('Access Denied')
    }
    const verified=jwt.verify(token.split(' ')[1],process.env.JWT_SECRET)
    const user=await pool.query('SELECT * FROM users WHERE id=$1',[verified.id])
    if(user.rows[0]){
        req.user_id=verified.id
    }

    next()
})
module.exports=protect


