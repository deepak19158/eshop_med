import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
// import PersonalInfo from "./components/profile/PersonalInfo";
import OrderHistory from "./components/profile/OrderHistory";
import axios from "axios";
import styled from "styled-components";

const Profile = () => {
  const [order, SetOrder] = useState(null);
  const [user, SetUser] = useState(null);

  const getUserInfo = async () => {
    const user = await axios.get(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    SetUser(user.data);
  };
  const getOrderInfo = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/order/getAllOrder`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    SetOrder(res.data.reverse()); //reversing the array and storing in user
  };

  useEffect(() => {
    getUserInfo();
    getOrderInfo();
  }, []);

  return (
    <Wrapper style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <br />
                <br />
                <p className="text-muted mb-1">{user ? user.name : ""}</p>
                <p className="text-muted mb-4">{user ? user.email : ""}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">{order ? <OrderHistory orders={order} /> : ""}</MDBCol>
        </MDBRow>
      </MDBContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  label {
    cursor: pointer;
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    margin-right: 10px;
  }

  label:hover {
    background-color: #d0d0d0;
  }

  label.active {
    background-color: #007bff;
    color: #fff;
  }
`;
export default Profile;
