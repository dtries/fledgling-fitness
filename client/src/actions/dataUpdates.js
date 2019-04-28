import axios from "axios";
import {
    GET_ERRORS
} from "./types";

// Register User
export const baseLineSubmit = data => dispatch => {
    axios
        .post("/api/users/workoutdata", data)
        .then(console.log("HEY MADE IT HERE IN BASELINE SUBMIT"))
            // res => history.push("/workouts")) //re-direct login on successful register
        .catch(err => 
            dispatch ({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
// export const loginUser = userData => dispatch => {
//     axios   
//         .post("/api/users/login", userData)
//         .then(res => {
//             //  Save to localStorage

//             // Set token to localStorage

//             const { token } = res.data;
//             localStorage.setItem("jwtToken", token);
//             // Set token Auth header
//             const decoded = jwt_decode(token);
//             // Set current user
//             dispatch(setCurrentUser(decoded));
//         })
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };

// Set logged in user
// export const setCurrentUser = decoded => {
//     return {
//         type: SET_CURRENT_USER,
//         payload: decoded
//     };
// };

// User loading
// export const setUserLoading = () => {
//     return {
//         type: USER_LOADING
//     };
// };

// Log user out
// export const logoutUser = () => dispatch => {
//     // Remove token from local storage
//     localStorage.removeItem("jwtToken");
//     // Remove auth header for future requests
//     setAuthToken(false);
//     // Set current user to empty object {} which will set isAuthenticated to false
//     dispatch(setCurrentUser({}));
// };