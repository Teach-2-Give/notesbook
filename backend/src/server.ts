import express from 'express';
import dotenv from 'dotenv';
import pool from './db';
import notesRoutes from './routes/notesRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import healthRoutes from './routes/healthRoutes';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
}));

const port = process.env.PORT || 3000;

const swaggerDocument = YAML.load('./src/swagger.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(notesRoutes);
app.use(healthRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Database connection failed');
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
