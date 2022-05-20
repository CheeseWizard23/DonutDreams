import * as actionTypes from '../constants/orderConstants';
import axios from 'axios';

export const getOrders = (userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/orders/${userId}`);

        dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
        type: actionTypes.GET_ORDERS_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const checkout = (orderData, userId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.POST_ORDER_REQUEST });

        const { data } = await axios.post(`api/orders/checkout/${userId}`, orderData, {
            headers: {
                'content-type': 'application/json'
            }
        });

        dispatch({ 
            type: actionTypes.POST_ORDER_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.POST_ORDER_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const orderReset = () => (dispatch) => {
    dispatch({ type: actionTypes.POST_ORDER_REQUEST_RESET });
};