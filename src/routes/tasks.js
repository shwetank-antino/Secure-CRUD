import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/tasks.js';

const router = express.Router();

router.route('/')
.post(createTask)
.get(getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
