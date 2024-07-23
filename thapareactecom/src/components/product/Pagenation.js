import React from 'react';
import styled from "styled-components";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { Button } from '../../styles/Button';

export default function Pagenation({currentPage, setCurrentPage, lengthOfProduct, maxProductPerPage}) {

  const lengthOfPages = Math.floor(lengthOfProduct/maxProductPerPage) + 1;

  return (
    <Wrapper>
        <nav aria-label="Page navigation example">
            <ul className="pagination" style={{display:'flex', justifyContent:'center',fontSize:'3rem' }}>
                <li class="page-item">
                <a className={currentPage === 1 ? 'page-link disabled' : 'page-link'} onClick={()=>setCurrentPage(currentPage-1)} aria-label="Previous" >
                    <span aria-hidden="true" >&laquo;</span>
                </a>
                </li>
                <li class="page-item" onClick={()=>setCurrentPage(currentPage-1)}>
                    {currentPage>1 ? <a class="page-link" >{currentPage-1}</a> : ""}
                </li>
                <li class="page-item"><a class="page-link" style={{color:'black', fontWeight: 'bold'}}>{currentPage}</a></li>
                <li class="page-item" onClick={()=>setCurrentPage(currentPage+1)} >
                    {currentPage<lengthOfPages ? <a class="page-link">{currentPage+1}</a>:""}
                    </li>
                <li class="page-item">
                <a className={currentPage === lengthOfPages ? 'page-link disabled' : 'page-link'} onClick={()=>setCurrentPage(currentPage+1)} aria-label="Next">
                    <span aria-hidden="true"  >&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </Wrapper>
    
  );
}


const Wrapper = styled.section`

  .pagination{
    display: flex;
    justify-center: center;
  }

  a {
    font-size: 1.5rem; /* Set font size of li elements to 3rem */
    /* Add any other styles for li elements */
  }

  .disabled {
    pointer-events: none; /* Disable pointer events */
    opacity: 0.6; /* Reduce opacity to indicate disabled state */
    cursor: not-allowed; /* Change cursor to indicate not clickable */
  }
`;

