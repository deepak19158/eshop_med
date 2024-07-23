import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../../context/filtercontext";
import GridView from "../filter/GridView";
import ListView from "../filter/ListView";
import { useEffect, useState } from "react";
import Pagenation from "./Pagenation";

const ProductList = () => {
  const { filterProducts, gridView, loading } = useFilterContext();
  const [loadingUpdatedProduct, setLoadingUpdatedProduct] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState([]);

  console.log("filter loading --->",loading)
  const [currentPage, setCurrentPage] = useState(1);
  const maxProductPerPage = 2;

  const startIndex = (currentPage-1)*maxProductPerPage;
  const endIndex = (currentPage)*maxProductPerPage;


  useEffect(()=>{
    
    if(filterProducts){
      setLoadingUpdatedProduct(true);
      setUpdatedProducts(filterProducts.slice(startIndex,endIndex));
    }
  },[filterProducts,currentPage])

  if(!loadingUpdatedProduct && !loading){
    return <p>Loading</p>
  }

  if (gridView) {
    return <GridView products={updatedProducts} />;
  }
  
  return <>
    <ListView products={updatedProducts} />
    <Pagenation currentPage={currentPage} setCurrentPage={setCurrentPage} lengthOfProduct={filterProducts.length} maxProductPerPage={maxProductPerPage}/>
  </>
};


export default ProductList;
