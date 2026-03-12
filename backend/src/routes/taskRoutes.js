import express from "express";
import {
  createTask,
  deleteTask,
  getallTasks,
  updateTask,
} from "../controllers/taskControllers.js";
const router = express.Router();

router.get("/", getallTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
