require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const fs = require('fs');
const csv = require('csv-parser');
const ProductJson = require("./products3.json");

const uri = process.env.MONGODB_URL;
const filePath = "D:\\google chrome download\\hustle\\eshop_med\\RESTAPI_Backend\\xyz2.csv"

console.log(uri);
const start = async () => {
  try {
    await connectDB(uri);
    await Product.deleteMany();

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        const { Code, Name, CompanyName, Pack, Mrp } = row; // Adjust field names as per CSV

        if (Code && Name && CompanyName && Pack && Mrp) {
          // Create new product instance
          // Create new product instance
          const product = new Product({
            code:Code,
            name:Name,
            company: CompanyName,
            pack:Pack,
            price: parseFloat(Mrp)*100, // Assuming mrp is a number in CSV
          });

          // Save product to MongoDB
          await Product.create(product);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        
      });

    
    // console.log("success");
    
  } catch (error) {
    console.log(error);
  }
};

start();
