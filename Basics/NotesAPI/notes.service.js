import express from "express";

const notesRouter = express.Router();

const notes = [];

notesRouter.get("/", (req, res) => {
  res.json(notes);
});

notesRouter.post("/", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

notesRouter.get("/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find((n) => n.id === noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }
  res.json(note);
});

notesRouter.put("/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex((n) => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found." });
  }

  const { title, content } = req.body;

  notes[noteIndex] = {
    id: noteId,
    title: title || notes[noteIndex].title,
    content: content || notes[noteIndex].content,
  };

  notes[noteIndex] = { id: noteId, title, content };
  res.json(notes[noteIndex]);
});

notesRouter.delete("/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex((n) => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found." });
  }
  notes.splice(noteIndex, 1);
  res.status(204).send();
});

export default notesRouter;
