const api = require("express").Router();
const uuid = require("../helpers/uuid");
const fs = require("fs");

// route to handle post requests to add a note
api.post("/", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNoteId = uuid();
  newNote.id = newNoteId;
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(newNote);
});
// route to handle get requests for notes
api.get("/", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});
// route to handle delete requests for notes
api.delete("/:id", (req, res) => {
  const idToDelete = req.params.id;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const toDelete = notes.findIndex((note) => note.id === idToDelete);
  if (toDelete >= 0) {
    notes.splice(toDelete, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json({ message: "Note deleted" });
  } else {
    res.status(404).send("Note not found");
  }
});

module.exports = api;
