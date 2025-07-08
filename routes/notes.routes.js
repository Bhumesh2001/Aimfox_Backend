const express = require("express");
const router = express.Router();
const controller = require("../controllers/notes.controller");

router.get("/:lead_id/notes", controller.getNotes);
router.post("/:lead_id/notes", controller.createNote);
router.patch("/:lead_id/notes/:note_id", controller.updateNote);
router.delete("/:lead_id/notes/:note_id", controller.deleteNote);

module.exports = router;