const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};


  let apiData = Product.find(queryObject).limit(10);


  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  // page = 2;
  // limit = 3;
  // skip =  1 * 3 = 3

  // apiData = apiData.skip(skip).limit(limit);

  console.log(queryObject);

  const Products = await apiData;
  // console.log("product controller ---> ",Products[0]);
  res.status(200).json({ "Products":Products.slice(0,9), nbHits: Products.length });
};

const getOneProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const product = await Product.findOne({ _id: productId });
  res.send(product);
};

module.exports = { getAllProducts, getOneProduct };
