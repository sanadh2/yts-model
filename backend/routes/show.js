const { series } = require("../series");
const { Show } = require("../Model/seriesModel");
const express = require("express");
const showRouter = express.Router();
const { asyncWrapper } = require("../middlewares/async");

showRouter.get(
  "/addSeries",
  asyncWrapper(async (req, res, next) => {
    const shows = await Show.create(series);
    res.status(200).json({ shows });
  })
);

module.exports = { showRouter };
