const express = require("express");
const router = express.Router();
const {
  getDonuts,
  getDonutById,
} = require("../controllers/donutController");

router.get("/", getDonuts);
router.get("/:id", getDonutById);

module.exports = router;