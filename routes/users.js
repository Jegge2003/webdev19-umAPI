const express = require("express");

const router = express.Router();

const { User } = require("../models/users");

const _ = require("lodash");

const objectID = require("mongoose").Types.ObjectId;

router.get("/", async (req, res) => {
  const { gender, age, name } = req.query;

  if (!_.isUndefined(gender) && !_.isUndefined(age)) {
    usersFromDB = await User.find({ gender: gender, age: age });
    return res.json(usersFromDB);
  } else if (!_.isUndefined(gender)) {
    usersFromDB = await User.find({ gender: gender });
    return res.json(usersFromDB);
  } else if (!_.isUndefined(age)) {
    console.log(age);
    usersFromDB = await User.find({ age: parseInt(age) });

    return res.json(usersFromDB);
  } else if (!_.isUndefined(name)) {
    usersFromDB = await User.find({ name: name });
    return res.json(usersFromDB);
  }

  const users = await User.find();

  res.json(users);
});

router.get("/:id", async (req, res) => {
  userID = req.params["id"];

  if (!objectID.isValid(userID)) {
    return res.status(404).send();
  }

  usersFromDB = await User.findById(userID);

  if (usersFromDB === null) {
    return res.status(404).send();
  } else {
    res.json(usersFromDB);
  }
});

router.post("/", async (req, res) => {
  const { name, gender, age } = _.pick(req.body, ["name", "gender", "age"]);

  if (_.isUndefined(name) || _.isUndefined(gender) || _.isUndefined(age)) {
    return res.status(400).send();
  }
  if (!_.isString(name) || !_.isString(gender) || !_.isNumber(age)) {
    return res.status(400).send();
  }
  await User.create({ gender, age, name });

  res.status(201).send();
});

router.put("/:id", async (req, res) => {
  userID = req.params["id"];

  if (!objectID.isValid(userID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const { name, gender, age } = _.pick(req.body, ["name", "gender", "age"]);

  if (_.isUndefined(name) || _.isUndefined(gender) || _.isUndefined(age)) {
    return res.status(400).send();
  }
  if (!_.isString(name) || !_.isString(gender) || !_.isNumber(age)) {
    return res.status(400).send();
  }

  const usersFromDB = await User.findByIdAndUpdate(userID, {
    name,
    gender,
    age
  });

  if (!usersFromDB) {
    return res.status(404).send();
  }

  if (usersFromDB === undefined) {
    return res.status(404).send();
  }

  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  userID = req.params["id"];

  if (!objectID.isValid(userID)) {
    return res.status(400).send({ error: "invalid ID" });
  }

  const usersFromDB = await User.findByIdAndRemove(userID);

  if (!usersFromDB) {
    return res.status(404).send();
  }

  res.status(204).send();
});

module.exports = router;
