import * as actionTypes from "../constants/donutConstants";
import axios from "axios";

export const getDonuts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DONUTS_REQUEST });

    const { data } = await axios.get("/api/donuts");

    dispatch({
      type: actionTypes.GET_DONUTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DONUTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDonutDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DONUT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/donuts/${id}`);

    dispatch({
      type: actionTypes.GET_DONUT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DONUT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDonutDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DONUT_DETAILS_RESET });
};