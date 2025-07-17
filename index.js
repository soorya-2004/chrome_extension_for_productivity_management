const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/productivity");

const HistorySchema = new mongoose.Schema({
  url: String,
  timestamp: String,
});

const History = mongoose.model("History", HistorySchema);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/history", async (req, res) => {
  const record = new History(req.body);
  await record.save();
  res.json({ message: "Saved" });
});

app.get("/history", async (req, res) => {
  const data = await History.find();
  res.json(data);
});

app.listen(5002, () => {
  console.log("Backend running on http://localhost:5002");
});
