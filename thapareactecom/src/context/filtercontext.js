import { useContext } from "react";
import { createContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";
import axios from "axios";

const FilterContext = createContext();

const initialState = {
  filterProducts: [],
  allProducts: [],
  gridView: false,
  sorting_value: "lowest",
  filters: {
    text: "",
  },
  search : false,
};

const getFilteredProducts = async (name) => {

  const product = await axios.post(
    `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/filter/ByName`,
    {
      "name":name
    },
    {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    }
  );
  // console.log(product)
  return product.data.products;
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    return dispatch({ type: "SET_GRIDVIEW" });
  };

  const setListView = () => {
    return dispatch({ type: "SET_LISTVIEW" });
  };

  const toggleSearch = () => {
    return dispatch({ type: "TOGGLE_SEARCH" });
  };

  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  //update filter value
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
  };

  const clearFilters = () => {
    return dispatch({ type: "CLEAR_FILTERS" });
  };
  // function to sort
  useEffect( () => {
    if(state.filters.text!=""){
      
      const fetchData = async () => {
        try {
          const filteredProducts = await getFilteredProducts(state.filters.text);
          dispatch({ type: "FILTER_PRODUCTS" , payload:{filteredProducts} });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      
      
    }
  }, [state.search]);

  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [state.sorting_value]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        toggleSearch,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
