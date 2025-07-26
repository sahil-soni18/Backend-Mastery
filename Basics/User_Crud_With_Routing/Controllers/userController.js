let users = [
    { id: 1, name: "Sahil" },
    { id: 2, name: "$Soni" },
];

// Get all users
export const getUsers = (req, res) => {
    res.status(200).json(users);
};


export const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// Update a user by ID
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    user.name = name;
    res.status(200).json({ message: "User updated successfully", user });
};