import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
    { id: 1, name: "Sahil" },
    { id: 2, name: "Soni" }, 
]

app.get('/users', ( req, res ) => {
    res.json(users);
});

app.post('/users', ( req, res ) => {
    const { name } = req.body;

    if ( !name ) {
        res.status(400).json({ error: "Name is Required..." });
    }

    const newUser = {
        id: users.length + 1,
        name: name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});