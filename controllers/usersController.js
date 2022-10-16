const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  const formattedUser = format(user);
  res.json(formattedUser);
};

const updateUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  if (req.body?.firstName) user.firstName = req.body.firstName;
  if (req.body?.lastName) user.lastName = req.body.lastName;
  if (req.body?.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
  }

  const result = await user.save();
  const formattedUser = format(result);

  res.json(formattedUser);
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  const result = await User.deleteOne({ _id: req.params.id });
  res.json(result);
};

const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  if (!id || !oldPassword || !newPassword)
    return res.status(400).json({ message: "Some credentials are missing" });

  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.sendStatus(401);

  const match = bcrypt.compare(oldPassword, user.password);

  if (match) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    const result = user.save();
    res.json({ message: "Password has been successfully changed" });
  } else {
    res.sendStatus(401);
  }
};

function format(user) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  };
}

module.exports = {
  deleteUser,
  getUser,
  updateUser,
  changePassword,
};
