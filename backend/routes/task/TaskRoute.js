import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
  getTaskById,
  getallTasks,
} from "../../controllers/taskController.js";

const TaskRouter = express.Router();

TaskRouter.get("/tasks", getTasks);
TaskRouter.get("/admin_tasks", getallTasks);
TaskRouter.get("/tasks/:id", getTaskById);
TaskRouter.post("/tasks", createTask);
TaskRouter.put("/tasks/:id", updateTask);
TaskRouter.patch("/tasks/status/:id", toggleTaskCompletion);
TaskRouter.delete("/tasks/:id", deleteTask);

export default TaskRouter;
