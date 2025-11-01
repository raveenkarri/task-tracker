import express from "express";
import {db} from '../db/tasksDb.js'
import authenticationRoute from "../middleware/authMiddleware.js";


const router = express.Router();

//POST /tasks
router.post("/",authenticationRoute, async (req,res)=>{
    try{
        const {title,description,priority,due_date,status} = req.body
        if(!title  || !priority || !due_date){
            return res.status(404).json({message: "All fields are Required!"})
        }
        const sql = "insert into tasks(title,description,priority,due_date,status) values(?,?,?,?,?)"
        const response = await db.run(sql,[title,description,priority,due_date,status])
        
        res.status(201).json({message: "Task Added successfully",id: response.lastId})


    }catch(err){
        console.log("Error",err.message)
        res.status(400).json({Error: err.message})
    }
})

//GET /tasks
router.get("/",authenticationRoute, async (req,res)=>{
    try{
        const {priority,status,order} = req.query
        
        let conditions = []
        let queries = []

        let sql = "select * from tasks"

        if(priority){
            conditions.push("priority = ?")
            queries.push(priority)
        }
        if(status){
            conditions.push("status = ?")
            queries.push(status)
        }
        if(conditions.length > 0){
            sql += " WHERE " + conditions.join(" AND ")
        }
        if(order){
            sql += ` order by due_date ${order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`
        }
        const tasks = await db.all(sql,queries)
        res.status(200).json({tasks})

    }catch(err){
        console.log("Error",err.message)
        res.status(400).json({Error: err.message})
    }
})

//PATCH /tasks/:id
router.patch("/:id",authenticationRoute, async (req,res)=>{
    try{
      const {id} = req.params
      const {status,priority} = req.body
      
      const task = await db.get("select * from tasks where id = ?",[id])
      if(!task){
        return res.status(404).json({message: "Task not Found!"})
      }
      await db.run("Update tasks set priority = ?, status = ? where id = ?",[priority,status,id])

      const updatedTask = await db.get("select * from tasks where id = ?",[id])

      res.status(200).json({message: "Task updated successfully",updatedTask})


    }catch(err){
        console.log("Error",err.message)
        res.status(400).json({Error: err.message})
    }
})

export default router