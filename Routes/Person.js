const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// import schema
const person = require("../Models/PersonSchema");

/************************************************************************model.find()***********************************************************************************/
router.get("/", async (req, res) => {
  try {
    const persons = await person.find();
    res.json(persons);
  } catch (err) {
    res.send("Error " + err);
  }
});
/************************************************************************************************************************************************************************/

/************************************************************************model.save()*********************************************************************************/
router.post("/addperson", async (req, res) => {
  let addperson = new person(req.body);
  try {
    const a1 = addperson.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});
/************************************************************************************************************************************************************************/

/************************************************************************model.create()*********************************************************************************/
const arrayOfPeople = [
  {
    name: "khaled",
    age: 38,
    favoriteFoods: ["Fettuccine Alfredo", "Sushi", "Quiche"],
  },
  { name: "marwen", age: 22, favoriteFoods: ["Pasta", "French Fries"] },
  { name: "anas", age: 41, favoriteFoods: ["Pasta", "pizza", "suchi"] },
  { name: "melek", age: 10, favoriteFoods: ["Pasta", "fish", "Quiche"] },
  {
    name: "mahdi",
    age: 36,
    favoriteFoods: ["Pasta", "Cheeseburgers", "French Fries"],
  },
];
router.post("/addmanyperson", (req, res) => {
  person
    .create(arrayOfPeople)
    .then(function (docs) {
      res.json(docs);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});
/************************************************************************************************************************************************************************/

/************************************************************************model.findOne(favoriteFoods)********************************************************************/
router.get("/onePerson", (req, res) => {
  person
    .findOne({ favoriteFoods: "patté" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
/************************************************************************************************************************************************************************/

/************************************************************************model.findOne()*******************************************************************************/
router.get("/onePerson/:id", (req, res) => {
  person
    .findOne({ _id: "641a0aa6395f58698f380f4b" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
/************************************************************************************************************************************************************************/

/********************************************************************model.findByIdAndUpdate()***************************************************************************/
router.get("/persons/:id", (req, res) => {
  person
    .findByIdAndUpdate(
      "641a0aa6395f58698f380f4b",
      {
        $set: {
          age: 22,
        },
      },
      {
        new: true,
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
/************************************************************************************************************************************************************************/

/********************************************************************model.findByIdAndRemove()***************************************************************************/
router.get("/deleteperson/:id", (req, res) => {
  person
    .findByIdAndRemove({ _id: "641b0af20d50fb0b52ecb8b4" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
/************************************************************************************************************************************************************************/

router.get("/delete", (req, res) => {
  person
    .remove({ name: "mahdi" })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
module.exports = router;
