const { prisma } = require("../prismaClient/prismaClient");
const express = require("express");

const run = express();

run.get("/run/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const elem = await prisma.chicken.findUnique({
      where: {
        id: +id,
      },
    });
    if (elem.isRunning == true) {
      const chicken = await prisma.chicken.update({
        where: {
          id: +id,
        },
        data: {
          steps: +elem.steps + 1,
        },
      });
      res.status(200).send(chicken);
    }
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

module.exports = { run };
