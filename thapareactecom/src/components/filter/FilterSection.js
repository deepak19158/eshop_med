import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../../context/filtercontext";
import FormatPrice from "../../utils/FormatPrice";
import { Button } from "../../styles/Button";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

const FilterSection = () => {

  const {
    filters: { text ,category},
    updateFilterValue,
    toggleSearch,
    setLoadingTrue,

  } = useFilterContext();

  const handleOnClick = ()=>{
    toggleSearch();
    setLoadingTrue();
  }

  const handleDropdown = (event)=>{
    updateFilterValue({"name":event.target.getAttribute('name'), "value":event.target.textContent})
  }

  const handleTextSearch = (event)=>{
    updateFilterValue({"name":event.target.name, "value":event.target.value})
  }


  return (
    <Wrapper>
      <div className="filter-search">
        {/* <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            placeholder="Medicine"
            style={{ maxWidth: '100%' }}
          />
        </form> */}
        <div className="input-group" style={{ borderColor: '#3b71ca', borderWidth: '1px', borderStyle: 'solid', borderRadius: '4px' }}>
          <MDBDropdown group className='shadow-0'>
            <MDBDropdownToggle color='light' style={{ fontSize: '12px' }} >{category}</MDBDropdownToggle>
            <MDBDropdownMenu >
              <label name="category" value="ALL" onClick={handleDropdown}  >ALL</label>
              <br/>
              <label name="category" value="MEDICINE" onClick={handleDropdown} >MEDICINE</label>
              <br/>
              <label name="category" value="LAB" onClick={handleDropdown} >LAB</label>
            </MDBDropdownMenu>
          </MDBDropdown>
          <div className="form-outline" data-mdb-input-init>
            <input type="text" id="form1" name="text" value={text} onChange={handleTextSearch} placeholder="Search" className="form-control" />
            {/* <label className="form-label" for="form1">Search</label> */}
          </div>
          <button type="button" class="btn btn-primary" onClick={handleOnClick} data-mdb-ripple-init>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    width: 80%; /* Set input width to 80% */
    text-align: center; /* Center the input within its container */
    margin: 0 auto; /* Center align horizontally */
  
    input {
      // width: 100%;
      padding: 0.6rem 0.5rem;
      height: 40px;
      box-sizing: border-box; /* Ensure padding is included in the width */
    }
  }

  label {
    font-size: 1.2rem;
    padding-left: 8px;
    cursor: pointer;
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
