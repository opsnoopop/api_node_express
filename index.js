import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // ต้องเพิ่มก่อนใช้งาน POST

// สร้าง connection pool
const pool = mysql.createPool({
  host: 'container_mysql',        // ใช้ชื่อ container (docker-compose หรือ bridge network)
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
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'username and email are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );

    res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }

});

app.get('/users/:user_id', async (req, res) => {

  const intUserId = req.params.user_id;
  if (intUserId && !isNaN(Number(intUserId))) {
    try {
      const [rows] = await pool.query('SELECT user_id, username, email FROM users WHERE user_id = ?', [intUserId]); 
      res.status(200).json({ user_id: rows[0].user_id, username: rows[0].username, email: rows[0].email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid user_id' });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});