const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { getItemByName } = require("../controllers/filter");

// Route:1 --> to get the items from the cart
router.post("/ByName", getItemByName);

module.exports = router;
