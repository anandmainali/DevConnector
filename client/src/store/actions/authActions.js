import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
//Register
export const registerUser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => {
      history.push("/login");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login Get User Token
export const loginUser = userdata => dispatch => {
  axios
    .post("/api/users/login", userdata)
    .then(res => {
      //Save to localstorage
      const { token } = res.data;
      //Set token to localstorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user_data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Set loggedin User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
