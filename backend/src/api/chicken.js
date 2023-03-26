const { prisma } = require("../prismaClient/prismaClient");
const express = require("express");

const chicken = express();

chicken.get("/", async (req, res) => {
  try {
    const chicken = await prisma.chicken.findMany();
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

chicken.get("/:id", async (req, res) => {
  try {
    const chicken = await prisma.chicken.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

chicken.post("/", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      birthday: req.body.birthday,
      weight: req.body.weight,
      steps: req.body.steps,
      isRunning: req.body.isRunning,
    };
    const chicken = await prisma.chicken.create({
      data: {
        name: data.name,
        birthday: data.birthday,
        weight: data.weight,
        steps: data.steps,
        isRunning: data.isRunning,
      },
    });
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

chicken.put("/:id", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      birthday: req.body.birthday,
      weight: req.body.weight,
      steps: req.body.steps,
      isRunning: req.body.isRunning,
    };
    const chicken = await prisma.chicken.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: data.name,
        birthday: data.birthday,
        weight: data.weight,
        steps: data.steps,
        isRunning: data.isRunning,
      },
    });
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

chicken.patch("/:id", async (req, res) => {
  try {
    const updatedFields = req.body;
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] === "" || updatedFields[key] === 0) {
        delete updatedFields[key];
      }
    });
    const chicken = await prisma.chicken.update({
      where: {
        id: +req.params.id,
      },
      data: updatedFields,
    });
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

chicken.delete("/:id", async (req, res) => {
  try {
    const chicken = await prisma.chicken.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send(chicken);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

module.exports = { chicken };
