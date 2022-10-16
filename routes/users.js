const express = require("express");

const router = express.Router();

const {
  deleteUser,
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/usersController");

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/password").post(changePassword);

module.exports = router;
