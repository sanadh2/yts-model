const { User } = require("../Model/user");
const bcrypt = require("bcrypt");
const { asyncWrapper } = require("../middlewares/async");

const signIn = asyncWrapper(async (req, res, next) => {
  const { email, password, name } = req.body;
  const saltRounds = 16;
  let encryptedPw;

  await bcrypt.hash(password, saltRounds).then((hashedpw) => {
    encryptedPw = hashedpw;
    return true;
  });

  const userEmail = await User.create({
    email: email,
    password: encryptedPw,
    name: name,
  });

  return res.status(200).json(userEmail);
});

const users = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const result = await bcrypt.compare(password, user.password);
  if (result === true)
    return res.status(200).json({ success: true, user: user.name });
  else if (!user)
    return res.status(404).json({
      success: false,
      msg: "There is no user with this password and email",
    });
  else
    return res
      .status(422)
      .json({ success: false, msg: "The entered password is wrong..." });
});

module.exports = { signIn, users, login };
