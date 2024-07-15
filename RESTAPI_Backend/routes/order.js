const express = require("express");
const router = express.Router();
const multer = require('multer');
const fetchuser = require("../middleware/fetchuser");
const {
  placeOrder,
  getOrderDetailsById,
  getAllOrder,
  updateOrder
} = require("../controllers/order");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/placeOrder",  upload.none(), fetchuser, placeOrder);
router.put("/updateOrder/:orderId",fetchuser,updateOrder)
router.get("/getOrderDetails/:paymentId", getOrderDetailsById);
router.get("/getAllOrder", fetchuser, getAllOrder);

module.exports = router;
