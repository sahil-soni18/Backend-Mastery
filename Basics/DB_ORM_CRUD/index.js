import express from 'express';
import sequelize from './config/database.js';
import userRouter from './Routes/user.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRouter); 

(async () => {
  try {
    await sequelize.sync(); // sync DB
    console.log('📦 SQLite connected & models synced!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect DB', err);
  }
})();