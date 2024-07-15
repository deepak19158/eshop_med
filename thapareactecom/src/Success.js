import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Greeting from "./components/success/Greeting";
import Items from "./components/success/Items";
import Details from "./components/success/Details";
import { useOrderContext } from "./context/ordercontext";
import { useCartContext } from "./context/cartcontext";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const {
    state,
    refillCompleteOrder,
    updatePaymentDetails,
    clearOrderContextState,
  } = useOrderContext();

  const [data, setData] = useState(null);
  const { clearCart } = useCartContext();
  const [loading, setLoading] = useState(true); //loading variable - to render component - after all logic & api call


  useEffect(() => {
    
    console.log("line 67 Success.js going to place order");

    //this is called multiple time we need only once when it has complete information and modeofpayment is upadted very lastly
    console.log(`${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/order/updatingPlacedOrder`);
    axios
      .put(
        `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/order/updateOrder/${localStorage.getItem('orderId')}`,
        {
          paymentStatus: "Success"
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
        clearCart();
        clearOrderContextState();
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, []);
  

  return (
    <>
      {!loading ? (
        <section
          className="h-100 gradient-custom"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="10" xl="8">
                <MDBCard style={{ borderRadius: "10px" }}>
                  <Greeting />
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="fw-normal mb-0"
                        style={{ color: "#a8729a", fontSize: "16px" }}
                      >
                        Order Details
                      </p>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "14px" }}
                      >
                        Order Id : {data.data._id}
                      </p>
                    </div>
                    <Items cart={data.data.cartDetails.cart}/>
                    <Details Order={data.data} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      ) : (
        <div style={{ height: "50%" }}>
          <p>Can't open this Page, you can check your order in profile</p>
        </div>
      )}
    </>
  );
};

export default Success;
