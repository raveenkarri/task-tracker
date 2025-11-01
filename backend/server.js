import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { initializeDatabase} from "./src/db/tasksDb.js";


import userRoutes from './src/routes/loginRoutes.js'
import taskRoutes from './src/routes/taskRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverStart = async () => {
  try {
    await initializeDatabase();
  
    app.use("/user",userRoutes)
    app.use("/",taskRoutes)

    app.listen(8080, () => {
      console.log("Server running");
    });
  } catch (err) {
    console.log("Error in server connection", err.message);
  }
};

serverStart()


