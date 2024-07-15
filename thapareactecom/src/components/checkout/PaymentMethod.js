import React from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useOrderContext } from "../../context/ordercontext";
import styled from "styled-components";
import { useState } from "react";

const PaymentMethod = () => {


  const { state,updatePaymentDetails } = useOrderContext();

  const handleOnChange = (modeOfPayment) => {
    
    console.log("payment method --> ",modeOfPayment)
    updatePaymentDetails({modeOfPayment:modeOfPayment});
  };

  return (
    <Wrapper>
      <MDBContainer>
        <h4>Payment Method</h4>
        <MDBRow>
          <MDBCol>
            <label >
                <input
                    type="checkbox"
                    value="COD"
                    checked={state.paymentDetails.modeOfPayment === 'COD'}
                    onChange={()=>{handleOnChange("COD")}}
                    />
                Cash on Delivery (COD)
            </label>
            <br />
            <label style={{ color: '#aaa', cursor: 'not-allowed' }}>
                <input
                    type="checkbox"
                    value="Online Payment"
                    checked={state.paymentDetails.modeOfPayment === 'Online Payment'}
                    onChange={()=>{handleOnChange("Online Payment")}}
                    disabled={true}
                    />
                Online Payment
            </label>
            <br />

            {/* </div> */}
          </MDBCol>          
        </MDBRow>
      </MDBContainer>
    </Wrapper>
  );
};

export default PaymentMethod;

const Wrapper = styled.div`
  margin: 2rem 0;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h4 {
    font-size: 24px;
    font-weight: 700;
    text-transform: capitalize;
    padding: 15px 0;
  }
  label {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
    span {
      color: red;
    }
  }
  input {
    width: auto;
    font-size: 14px;
    padding: 8px 12px;
    text-transform: lowercase;
    outline: #ccc;
    box-shadow: none;
    border: 1px solid #ccc;
  }
  input:focus {
    outline: #ff7f23 auto 1px;
  }
`;
