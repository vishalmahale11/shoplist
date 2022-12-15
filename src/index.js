const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("../config/db");
const shoplistModel = require("../models/list.model");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8040;

app.get("/", async (req, res) => {
  try {
    const data = await shoplistModel.find();
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/lists", async (req, res) => {
  const { title, quantity, priority, description } = req.body;
  const date = new Date();
  const timestamps = date.getHours() + "" + ":" + date.getMinutes();
  const new_list = new shoplistModel({
    title,
    quantity,
    priority,
    description,
    timestamps: timestamps,
  });
  await new_list.save();
  res.send({ new_list });
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const task = await shoplistModel.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, async () => {
  try {
    await connection();
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
