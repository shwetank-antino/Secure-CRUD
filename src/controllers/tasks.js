import { query } from '../db/config.js';
import { v4 as uuid } from 'uuid';

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await query(
      'INSERT INTO tasks (id, title) VALUES ($1, $2) RETURNING *',
      [uuid(), title]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('CREATE TASK FAILED');
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getTasks = async (_req, res) => {
  try {
    const result = await query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const fields = [];
  const values = [];
  let index = 1;

  if (title !== undefined) { fields.push(`title=$${index++}`); values.push(title); }
  if (completed !== undefined) { fields.push(`completed=$${index++}`); values.push(completed); }

  if (!fields.length) return res.status(400).json({ error: 'At least one field (title or completed) must be provided.' });

  const queryText = `UPDATE tasks SET ${fields.join(', ')} WHERE id=$${index} RETURNING *`;
  values.push(id);

  try {
    const { rows, rowCount } = await query(queryText, values);
    if (!rowCount) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await query(
    'DELETE FROM tasks WHERE id=$1 RETURNING *',
    [id]
  );

  if (!result.rowCount) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
};
