/* eslint-disable react-hooks/exhaustive-deps */
import { MDBContainer } from "mdb-react-ui-kit";
import BillingAddress from "./components/checkout/BillingAddress";
import ShippingAddress from "./components/checkout/ShippingAddress";
import PaymentMethod from "./components/checkout/PaymentMethod";
import ImageUpload from "./components/checkout/ImageUpload";
import { useCartContext } from "./context/cartcontext";
import { useOrderContext } from "./context/ordercontext";
import axios from "axios";

// import { useEffect } from "react";
import SideCart from "./components/checkout/SideCart"

const Checkout = () => {
  const { total_price, shipping_fee } = useCartContext();
  const { state, cartDetails } = useOrderContext();
  

  const onlinePayment = async () =>{
    const order = await axios({
      method: "post",
      url: `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/payment/createorder`,
      data: {
        amount: total_price + shipping_fee,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });


    const { id: order_id, amount } = order.data;

    const options = {
      key: "rzp_test_dKhJ2jiI5qasOl", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: `${process.env.COMPANY_NAME}`,
      description: "Test Transaction",
      image: `${process.env.COMPANY_LOGO}`,
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/payment/success/${localStorage.getItem('orderId')}`,
      // callback_url: "http://localhost:3000/try",
      prefill: {
        name: `${state.billingInfo.firstName } ${state.billingInfo.lastName}`,
        email: `${state.billingInfo.email}`,
        contact:  `${state.billingInfo.phone}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
        cart: JSON.stringify(cartDetails),
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  
  const offlinePayment = async ()=>{
    // axios
    //     .post(
    //       `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/payment/success/${localStorage.getItem('orderId')}`,
    //       {"abc":"def"},
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "auth-token": localStorage.getItem("authToken"),
    //         },
    //       }
    //     )
        // .then((res)=>{
        //   console.log("order palced on COD",res);
        // })
        // .catch((err)=>{
        //   console.log("error on placing COD",err);
        // })
    window.location.href = '/success';
  }

  const placeOrderMongo = async ()=>{
    axios
        .post(
          `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/order/placeOrder`,
          {
            ...state,
            paymentStatus: "Pending"
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
          localStorage.setItem("orderId", res.data.orderId); //updating prevOrder details with state having all correct values
          // localStorage.setItem("prevOrderDetails", JSON.stringify(state)); //updating prevOrder details with state having all correct values
          
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // localStorage.setItem("orderDetails", JSON.stringify(state)); //right now state doesn;t have paymnet info - it will be updated at success page
    console.log("State ------> ",state);
    // localStorage.setItem("prevOrderDetails", JSON.stringify(state));
    try {
      await placeOrderMongo();
      if(state.paymentDetails.modeOfPayment === 'COD'){
        offlinePayment();
      }else{
        onlinePayment();
      }
      
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  return (
    <>
      <MDBContainer className="my-5 py-5" style={{ maxWidth: "1100px" }}>
        <SideCart />
        <form onSubmit={HandleSubmit}>
          {/* <ImageUpload/> */}
          <BillingAddress />
          <ShippingAddress />
          <PaymentMethod/>
          <div className="text-center">
            <button
              type="Submit"
              className="btn btn-success btn-block mx-auto"
              style={{
                height: "50px",
                fontSize: "16px",
                borderRadius: "10px",
                width: "50%",
              }}
            >
              Place order
            </button>
          </div>
        </form>
      </MDBContainer>
    </>
  );
};

export default Checkout;
