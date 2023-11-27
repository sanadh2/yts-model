const express = require("express");
const userRouter = express.Router();
const { User } = require("../Model/user");

const { signIn, users, login } = require("../routeHandlres/userHandler");

userRouter.post("/signin", signIn);
userRouter.get("/users", users);
userRouter.post("/login", login);

userRouter.get("/deleteall", async (req, res) => {
  try {
    await User.deleteMany({}).then(() => console.log("Database is Empty now"));
  } catch (err) {
    next(err);
  }
});

module.exports = { userRouter };
