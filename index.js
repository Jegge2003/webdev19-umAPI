const express = require("express"); //Importing express using the ES5 import style

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/umAPI").then(() => {
  console.log("Connected to MongoDB");
});

const app = express(); //This creates the express application

const users = require("./routes/users");

app.use(express.json()); //This takes our object in JSON form and changes it to a form that Express can process

app.use("/api/users", users); //setting initial path

app.listen(8080, () => {
  console.log("Server has started");
});
