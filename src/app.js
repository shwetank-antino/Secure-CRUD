import express from 'express';
import tasksRouter from './routes/tasks.js';

const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);

console.log('Health check endpoint added at /health');

app.get('/health', (req, res) => {
  res.json({ status: 200, message: 'OK' });
});

export default app;