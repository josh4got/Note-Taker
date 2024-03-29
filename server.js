// requires express and path
const express = require("express");
const path = require("path");
const fs = require("fs");
// helper method for generating unique ids
const uuid = require("./helpers/uuid");
// import routes
const routes = require("./routes");
// starts the express app
const app = express();
// sets port to 3001 and allows heroku to set port
const port = process.env.PORT || 3001;
// middleware for parsing JSON and urlencoded form data and set the public folder as a static folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("", routes);
// route for landing page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
// route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
// starts the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
