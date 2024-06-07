import request from 'supertest';
import app from '../src/server';
import pool from '../src/db';


beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
});


afterAll(async () => {
  await pool.query(`DROP TABLE IF EXISTS notes;`);
  await pool.end();
});

describe('Notes API', () => {
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .send({
        title: 'Test Note',
        content: 'This is a test note.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Note');
  });

  it('should fetch all notes', async () => {
    const res = await request(app).get('/notes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a single note by ID', async () => {
    const res = await request(app).get('/notes/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a note by ID', async () => {
    const res = await request(app)
      .put('/notes/1')
      .send({
        title: 'Updated Test Note',
        content: 'This is an updated test note.'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Test Note');
  });

  it('should delete a note by ID', async () => {
    const res = await request(app).delete('/notes/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Note deleted successfully');
  });
});
