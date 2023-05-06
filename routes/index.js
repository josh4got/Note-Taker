const express = require("express");

// Import our modular routers for /api/notes
const notesRouter = require("./api");
const app = express();

// set route for api/notes
app.use("/api/notes", notesRouter);

// Export our app, so that it can be imported to start the server.
module.exports = app;
