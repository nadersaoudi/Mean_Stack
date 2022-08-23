const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCount,
  getFeatured,
  uploadOptions,
  createGallery,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.post("/", uploadOptions.single("image"), createProduct);
router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  createGallery
);
router.route("/:id").get(getProduct);
router.put("/:id", uploadOptions.single("image"), updateProduct);
router.route("/:id").delete(deleteProduct);
router.route("/get/count").get(getCount);
router.route("/get/featured/:count").get(getFeatured);

module.exports = router;
