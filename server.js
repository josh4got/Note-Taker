// requires express and path
const express = require("express");
const path = require("path");
const fs = require("fs");
// helper method for generating unique ids
const uuid = require("./helpers/uuid");
// sets up the express port
const PORT = process.env.port || 3001;
// starts the express app
const app = express();
// middleware for parsing JSON and urlencoded form data and set the public folder as a static folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// route for landing page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
// route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
// starts the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// route to handle post requests to add a note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNoteId = uuid();
  newNote.id = newNoteId;
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(newNote);
});
// route to handle get requests for notes
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});
// route to handle delete requests for notes
app.delete("/api/notes/:id", (req, res) => {
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
