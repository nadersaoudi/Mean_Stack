const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  userDelete,
  countUser,
  creatUser,
  updateUser,
  login,
} = require("../controllers/userController");

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/").post(creatUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(userDelete);
router.route("/get/count").get(countUser);
router.route("/login").post(login);

module.exports = router;
