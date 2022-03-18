const asyncHandler=require('express-async-handler')
const pool=require('../db')
//get  neighborhood
const getNeighborhood=asyncHandler(async(req,res)=>{
    const {rows:neighborhood}=await pool.query('SELECT * FROM neighborhood')
    res.status(200).json(neighborhood)
}) 

//POST  neighborhood PRIVATE
const addNeighborhood=asyncHandler(async(req,res)=>{
    const name=req.body.name
    if(!name){throw new Error("Please provide a name of neighborhood")}
    const {rows:neighborhood}=await pool.query('INSERT INTO neighborhood(name) VALUES($1) RETURNING *',[name])
    res.status(200).json(neighborhood[0])
}) 

//DELETE  neighborhood PRIVATE
const deleteNeighborhood=asyncHandler(async(req,res)=>{
    const id=req.params.id
    console.log(id)
    if(!id){throw new Error("Please provide ID of neighborhood")}
    await pool.query('DELETE FROM complaint WHERE complaint.neighborhood_id=$1',[id])
    await pool.query('DELETE FROM neighborhood WHERE id=$1',[id])
    res.status(200).json({msg:'Neighborhood deleted successfully!'})
}) 

module.exports={getNeighborhood,addNeighborhood,deleteNeighborhood}