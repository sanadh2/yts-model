"use strict";
const https = require("https");
const fs = require("fs");
const express = require("express");
const connectDb = require("./DB");
require("dotenv").config();
const { userRouter } = require("./routes/userRoute");
const { movieRouter } = require("./routes/movie");
const { showRouter } = require("./routes/show");
const cors = require("cors");
const app = express();
const host = "0.0.0.0/0";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/user", userRouter);

app.use("/movies", movieRouter);

app.use("/shows", showRouter);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({ error: err.message });
  }
  next(err);
});

const start = async () => {
  await connectDb(process.env.MONGO_URL);
  app.listen(process.env.PORT, host, () =>
    console.log(`port is ${process.env.PORT}`)
  );
};
start();
