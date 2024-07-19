const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => {
        return curElem.price;
      });
      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRIDVIEW":
      return {
        ...state,
        gridView: true,
      };

    case "TOGGLE_SEARCH":
      return {
        ...state,
        search:!state.search,
      }

    case "SET_LOADING_TRUE":
      return {
        ...state,
        loading:true,
      }

    case "SET_LOADING_FALSE":
      return {
        ...state,
        loading:false,
      }
      
    case "SET_LISTVIEW":
      return {
        ...state,
        gridView: false,
      };


    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { filteredProducts } = action.payload;
      console.log(action.payload);

      return {
        ...state,
        filterProducts: filteredProducts,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          text: "",
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
