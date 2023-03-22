//require express , mongoose
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//invoke express
const app = express();
//create port
const port = 5000;
const PWD = process.env.PWD;
const USER = process.env.USER;
// connexion database with server
const mongo_uri = `mongodb+srv://${USER}:${PWD}@chaabi-cluster.iej3n21.mongodb.net/person?retryWrites=true&w=majority`;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("connected success..."))
  .catch((err) => console.log(err));

// parse data to json object
app.use(express.json());
// import person
app.use("/person", require("./Routes/Person"));

// listen on port 5000
app.listen(port, (err) => {
  err ? console.log(err) : console.log("running server on  port 5000.....");
});
