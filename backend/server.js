import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { initializeTasksDb} from "./src/db/tasksDb.js";
import { initializeUsersDb} from "./src/db/userDb.js";

import userRoutes from './src/routes/loginRoutes.js'
import taskRoutes from './src/routes/taskRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const serverStart = async () => {
  try {
    await initializeTasksDb();
    await initializeUsersDb();
    
    app.use("/user",userRoutes)
    app.use("/tasks",taskRoutes)

    app.listen(8080, () => {
      console.log("Server running");
    });
  } catch (err) {
    console.log("Error in server connection", err.message);
  }
};

serverStart()


