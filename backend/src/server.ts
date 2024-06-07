import express from 'express';
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Database connection failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
