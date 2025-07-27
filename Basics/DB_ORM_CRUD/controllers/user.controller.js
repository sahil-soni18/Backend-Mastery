import db from "../models/index.js";

export const getUsers = async (req, res) => {
  const users = await db.User.findAll();
  res.status(200).json(users);
};

export const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = await db.User.create({ name });

  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  user.name = name;
  await user.save();
  res.status(200).json({ message: "User updated successfully", user });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await user.destroy();

  res.status(200).json({ message: "User Deleted Successfully..." });
};
