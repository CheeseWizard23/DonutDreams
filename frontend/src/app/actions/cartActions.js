import * as actionTypes from '../constants/cartConstants'
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/donuts/${id}`)

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            donut: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ 
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const cartReset = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.CART_RESET });

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
  };