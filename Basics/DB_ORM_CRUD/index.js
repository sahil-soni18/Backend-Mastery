import express from 'express';
import sequelize from './config/database.js';
import userRouter from './Routes/user.route.js';
import postRouter from './Routes/post.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRouter); 
app.use('/posts', postRouter);

(async () => {
  try {
    await sequelize.sync(); // sync DB
    console.log('📦 Postgres connected & models synced!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect DB', err);
  }
})();