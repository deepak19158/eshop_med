import React from "react";
import { useFilterContext } from "../../context/filtercontext";
import GridView from "../filter/GridView";
import ListView from "../filter/ListView";
import { useEffect, useState } from "react";

const ProductList = () => {
  const { filterProducts, gridView, loading } = useFilterContext();
  const [loadingUpdatedProduct, setLoadingUpdatedProduct] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  

  useEffect(()=>{
    
    if(filterProducts){
      setLoadingUpdatedProduct(true);
      setUpdatedProducts(filterProducts.slice(0,10));
    }
  },[filterProducts])

  if(!loadingUpdatedProduct && !loading){
    return <p>Loading</p>
  }

  if (gridView) {
    return <GridView products={updatedProducts} />;
  }
  return <ListView products={updatedProducts} />;
};

export default ProductList;
