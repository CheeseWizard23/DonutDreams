import * as actionTypes from '../constants/reviewConstants'
import axios from 'axios';

export const getReviews = () => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_REVIEWS_REQUEST });
  
      const { data } = await axios.get("/api/reviews");
  
      dispatch({
        type: actionTypes.GET_REVIEWS_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_REVIEWS_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const getUserReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/reviews/${id}`);

    dispatch({
      type: actionTypes.GET_REVIEWS_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVIEWS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const submitReview = (reviewData, userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.POST_REVIEW_REQUEST });

        const { data } = await axios.post(`api/reviews/${userId}`, reviewData, {
            headers: {
                'content-type': 'application/json'
            }
        });

        dispatch({ 
            type: actionTypes.POST_REVIEW_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.POST_REVIEW_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const removeReview = (userId, reviewId, orderId) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: actionTypes.DELETE_REVIEW_REQUEST  
    })

      await axios.delete(`api/reviews/${userId}/${reviewId}/${orderId}`)

      dispatch({ 
        type: actionTypes.DELETE_REVIEW_REQUEST_SUCCESS,
        payload: reviewId,
      });
    } catch (error) {
      dispatch({
          type: actionTypes.DELETE_REVIEW_REQUEST_FAIL,
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
      });
    }
};

export const postReviewReset = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.POST_REVIEW_REQUEST_RESET });  
};

export const getReviewReset = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_REVIEWS_REQUEST_RESET }); 
};

export const removeReviewReset = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.DELETE_REVIEW_REQUEST_RESET });  
};