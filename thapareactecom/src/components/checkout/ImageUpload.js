import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useOrderContext } from "../../context/ordercontext";

import styled from "styled-components";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const { updatePrescription } = useOrderContext();

  const handleImageChange =async  (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("file -----> ",file.name,"\nbase64 --->",base64);
    
    updatePrescription({'filename':file.name, 'base64':base64});
  };


  return (
    <Wrapper>
        <MDBContainer>
        <h4>Upload Prescription</h4>
        <MDBRow>
          <div>
            <input type="file" accept='.jpg, .png, .jpeg' onChange={handleImageChange} />
          </div>
          </MDBRow>
        </MDBContainer>
    </Wrapper>
    
  );
};

const convertToBase64 = (file)=>{
  return new Promise((resolve, reject)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror = (error)=>{
      reject(error)
    }
  })
}

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
    width: 100%;
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


export default ImageUpload;
