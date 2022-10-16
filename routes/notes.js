const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");

router.route("/").post(createNote);

router
  .route("/:id")
  .get(getAllNotes)
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
