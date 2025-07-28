import db from "../models/index.js";

const createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ error: "Title, content, and userId are required" });
  }

  const user = await db.User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const newPost = await db.Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const posts = await db.Post.findAll({
    where: { userId },
    include: [{ model: db.User, as: "author" }],
  });

  if (!posts) {
    return res.status(404).json({ error: "No posts found for this user" });
  }

  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await db.Post.findByPk(id, {
    include: [{ model: db.User, as: "author" }],
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
};

export { createPost, getUserPosts, getPostById };
