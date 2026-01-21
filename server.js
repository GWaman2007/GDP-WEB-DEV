const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Note = require("./models/Note");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Create note
app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// Update
app.patch("/notes/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNote);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
