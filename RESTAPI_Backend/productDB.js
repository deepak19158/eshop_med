require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const ProductJson = require("./products3.json");

const uri = process.env.MONGODB_URL;
console.log(uri);
const start = async () => {
  try {
    await connectDB(uri);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
