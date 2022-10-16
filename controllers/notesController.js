const Note = require("../models/Note");

const getAllNotes = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "user ID is required" });

  const notes = await Note.find({ userId: req.params.id });

  if (!notes) return res.status(204).json({ message: "No notes found" });

  res.json(notes);
};

const getNote = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "note ID is required" });

  const note = await Note.findOne({ _id: req.params.id }).exec();

  if (!note) {
    return res
      .status(204)
      .json({ message: `No note matches ID ${req.params.id}.` });
  }

  res.json(note);
};

const createNote = async (req, res) => {
  if (!req?.body?.content || !req?.body?.userId) {
    return res.status(400).json({ message: "Notes data might be missing" });
  }

  try {
    const result = await Note.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateNote = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const note = await Note.findOne({ _id: req.params.id }).exec();

  if (!note) {
    return res
      .status(204)
      .json({ message: `No Note matches ID ${req.params.id}.` });
  }

  if (req.body?.title) note.title = req.body.title;
  if (req.body?.content) note.content = req.body.content;

  const result = await note.save();
  res.json(result);
};

const deleteNote = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Note ID is required" });

  const note = await Note.findOne({ _id: req.params.id }).exec();

  if (!note) {
    return res
      .status(204)
      .json({ message: `No note matches ID ${req.params.id}.` });
  }

  const result = await Note.deleteOne({ _id: req.params.id });
  res.json(result);
};

module.exports = {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
};
