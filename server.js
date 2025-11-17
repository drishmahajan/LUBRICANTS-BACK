const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/clientDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const clientSchema = new mongoose.Schema({
  clientName: String,
  pan: String,
  gstin: String,
  email: String,
  mobile: String
});

const Client = mongoose.model("Client", clientSchema);

app.post("/save-client", async (req, res) => {
  try {
    await Client.create(req.body);
    res.redirect("/success.html");
  } catch (err) {
    res.redirect("/error.html");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
