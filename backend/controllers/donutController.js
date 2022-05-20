const Donut = require("../models/donutModel");

const getDonuts = async (req, res) => {
  try {
    const Donuts = await Donut.find({});
    res.json(Donuts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getDonutById = async (req, res) => {
  try {
    const donut = await Donut.findById(req.params.id);

    res.json(donut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDonuts,
  getDonutById,
};