const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exams23002";
mongoose.connect(uri, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: { type: String, required: true },
  sid: { type: String, required: true },
});

const ExamRecord = mongoose.model("ExamRecord", recordSchema);

const router = require("express").Router();

router.route("/").get((req, res) => {
  const name = "Bill Nguyen";
  const sid = "12345";

  const newRecord = new ExamRecord({
    name,
    sid,
  });

  console.log("checkpoint");

  newRecord
    .save()
    .then(() => res.json("Student added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.use('/examrecords', router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



