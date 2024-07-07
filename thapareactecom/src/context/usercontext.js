import React, { createContext, useContext, useState } from "react";
import { useReducer } from "react";
import reducer from "../reducer/userReducer";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const initialState = {
  user: {
    name: "",
  },
  login: {
    email: "",
    password: "",
  },
  signup: {
    name: "",
    email: "",
    password: "",
  },
};

export const UserProvider = ({ children }) => {
  // const navigate = useNavigate(); //to redirect to other page

  const [authToken, setAuthToken] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const set = (token) => {
    setAuthToken(token);
  };

  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ON_CHANGE_LOGIN", payload: { name, value } });
  };

  const onChangeSignup = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ON_CHANGE_SIGNUP", payload: { name, value } });
  };

  const SubmitLogin = async () => {
    // e.preventDefault();
    // try {
    const auth = await axios.post(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, //loging in the user and getting the auth token in return
      state.login,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("user context line 53", auth);
    localStorage.setItem("authToken", auth.data.authtoken); //storing cart token in local sotrage
    dispatch({ type: "SET_USERNAME", payload: auth.data.user.name }); //setting the username

    const cart = await axios.get(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/cart`,
      {
        //extracting cart item from mongodb
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    localStorage.setItem("thapaCart", JSON.stringify(cart.data.items)); //storing cart items in local storage
  };

  const SubmitSignUp = async () => {
    // try {

    console.log(process.env.REACT_APP_HYPERTEXT)
    const auth = await axios.post(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, //loging in the user and getting the auth token in return
      state.signup,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("authToken", auth.data.authtoken);
    dispatch({ type: "SET_USERNAME", payload: auth.data.user.name }); //setting the username
    localStorage.setItem("thapaCart", JSON.stringify([]));
    // } catch (error) {
    //   console.log("Error in signup");
    // }
  };

  const getUser = async () => {
    const user = await axios.get(
      `${process.env.REACT_APP_HYPERTEXT}://${process.env.REACT_APP_BACKEND_URL}/getuser`,
      {
        //extracting cart item from mongodb
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    return user;
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        authToken,
        setAuthToken,
        set,
        onChangeLogin,
        onChangeSignup,
        SubmitLogin,
        SubmitSignUp,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
