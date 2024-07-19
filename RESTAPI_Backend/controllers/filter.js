const Product = require("../models/product");
const stringSimilarity = require('string-similarity');
const ObjectId = require("mongoose").Types.ObjectId;

const getItemByName = async (req, res) => {
  try {
    // console.log(req);
    const {name} = req.body;
    // const products = await Product.find({ });
    // // console.log(products.length, name);
    // const matches = stringSimilarity.findBestMatch(name.toLowerCase(), products.map(p => p.name.toLowerCase()));

    // let filteredProduct = [];
    // matches.ratings.forEach((curElem,index)=>{
    //     if(curElem.rating>=0.45){
    //         filteredProduct.push(products[index]);
    //     }
    // })

    const regex = new RegExp(name, 'i');
    const filteredProduct = await Product.find({ name: regex }).exec();
    console.log(filteredProduct)
    res.status(200).json({ "products": filteredProduct });
    
  } catch(error) {
    res.status(500).json({ error });
  }
};



module.exports = { getItemByName};
