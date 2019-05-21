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

