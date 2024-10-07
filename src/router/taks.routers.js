import { Router } from "express";
import {
  deleteTask,
  getAllTask,
  getTask,
  postTask,
  putTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.get("/task", getAllTask);

router.get("/task/:id", getTask);

router.post("/task", postTask);

router.put("/task/:id", putTask);

router.delete("/task/:id", deleteTask);

export default router;
