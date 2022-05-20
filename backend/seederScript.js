require("dotenv").config();

const donutsData = require("./data/donuts");
const connectToDB = require("./config/connectToDB");
const Donut = require("./models/donutModel");

connectToDB();

const importData = async () => {
  try {
    await Donut.deleteMany({});

    await Donut.insertMany(donutsData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();