const express = require("express");
const {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(getCategorys);
router.route("/:id").get(getCategory);
router.route("/").post(createCategory);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
