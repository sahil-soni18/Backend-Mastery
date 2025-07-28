import express from 'express';
import { loggerware } from './loggerware.js';
import { authMiddleware } from './authMiddleware.js';
import apiLimiter from './rateLimiter.js';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' } 
);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerware);
app.use(apiLimiter);
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data', authMiddleware,  (req, res) => {
    res.json({ message: 'Data received.', data: req.body });
});

app.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
