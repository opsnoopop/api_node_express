import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // ต้องเพิ่มก่อนใช้งาน POST

// สร้าง connection pool
const pool = mysql.createPool({
  host: 'mysql',        // ใช้ชื่อ container (docker-compose หรือ bridge network)
  user: 'root',
  password: 'password',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,        // จำนวน connection สูงสุด
  queueLimit: 0,
  acquireTimeout: 60000,      // timeout การขอ connection
  timeout: 60000,             // query timeout
  reconnect: true             // auto reconnect
});

// root route
app.get('/', async (req, res) => {

  res.status(200).json({ message: 'Hello World from Node'});

});

app.post('/users', async (req, res) => {

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }

});

app.get('/users/:id', async (req, res) => {

  const userId = req.params.id;
  if (userId && !isNaN(Number(userId))) {
    try {
      const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
      res.status(200).json({ id: rows[0].id, user: rows[0].name, email: rows[0].email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid user ID' });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});