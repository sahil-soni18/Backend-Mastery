import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', ( req, res ) => {
    const { name } = req.query;

    res.json({
        name: `Hello, ${name || 'user'}`,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
})
