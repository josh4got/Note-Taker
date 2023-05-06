// requires express and path
const express = require("express");
const path = require("path");
// sets up the express port
const PORT = process.env.port || 3001;
// starts the express app
const app = express();
// uses the express app
app.use(express.static("public"));
// route for landing page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
// route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// TODO: have save icon appear when note title and text entered

// TODO: when save icon is clicked the new is saved and appears in the left column

// TODO: when a note title in the left column is clicked the note appears in the right column

// TODO: when I click on the write icon in the navigation at the top of the page I am presented with empty fields to enter a new note title and the note's text in the right column

// TODO: when I click on the trash icon next to a note in the left column that note is deleted
