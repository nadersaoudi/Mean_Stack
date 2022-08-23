const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotal,
  getUserByOrder,
} = require("../controllers/orderController");
router.route("/").get(getOrders);
router.route("/:id").get(getOrder);
router.route("/").post(createOrder);
router.route("/:id").put(updateOrder);
router.route("/:id").delete(deleteOrder);
router.route("/get/totalsales").get(getTotal);
router.route("get/userorders/:userid").get(getUserByOrder);

module.exports = router;
