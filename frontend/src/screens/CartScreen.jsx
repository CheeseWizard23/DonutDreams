import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromCart, cartReset } from "../app/actions/cartActions";
import { checkout, orderReset } from "../app/actions/orderActions";
import { orderCreated } from "../app/actions/navigationActions";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './CartScreen.css'
import CartItem from '../components/CartItem'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen, openTwo, setOpenTwo, openThree, setOpenThree, openFour, setOpenFour] = useState(false);
  const [shippingAddressData, setShippingAddressData] = useState({
    shippingAddress: '',
  })
  const {shippingAddress} = shippingAddressData; 

  const onChange = (e) => {
    setShippingAddressData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const close_all = () => {
    setOpen(false);
    setOpenTwo(false);
    setOpenThree(false);
    setOpenFour(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    close_all();
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderDetails = useSelector((state) => state.checkoutOrder);
  const { loading, error, order, success } = orderDetails;

  const userId = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if(success) {
      dispatch(orderReset());
      dispatch(cartReset());
      dispatch(orderCreated());
      navigate(`/Orders`)
    }

  }, [order, error, loading, navigate, dispatch, cartItems, success, userId])

  const empty_cart = () => {
    return setOpen(true)
  }

  const onSubmit = (e) => {
    const orderItems= []
    e.preventDefault()  
    for (let i = 0; i < cartItems.length; i++) {
      orderItems.push(cartItems[i])
    }

    if (orderItems.length === 0 || shippingAddress === '') {
      return empty_cart();
    }

    const donuts = orderItems.map(({ name, qty, price }) => ({ name, qty, price }))
    const totalQuantity = getCartCount()
    const totalPrice = parseFloat(getCartSubTotal())

    const orderData = {
      donuts,
      totalQuantity,
      totalPrice,
      shippingAddress,
    }

    dispatch(checkout(orderData, userId._id))

  } 

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
            <div className="empty_cart">
              Your Cart Is Empty, <Link className="empty_cart" to="/">Go Back to Menu</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem item={item} key={item.donut} qtyChangeHandler={qtyChangeHandler} removeFromCartHandler={removeFromCartHandler}/>
            ))
        )}
      </div>

      <div className="cartscreen_right">
        <div className='cartscreen_info'>
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartSubTotal()}</p>
          <p>----------------------</p> 
          <p style={{ display: 'flex', flex: 'row' }}>
            Shipping Address:  
            <span style={{ marginLeft: 15 }}>
              <input className="addressInput" type="text" id="shippingAddress" name="shippingAddress" value={shippingAddress} onChange={onChange}/>
            </span>
          </p> 
        </div>

        <div>
        </div>

        <div>
          <button onClick={onSubmit}>Checkout</button>
        </div>
      </div>

        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
            Please Add Items in your Cart | Please enter a Shipping Address
          </Alert>
        </Snackbar>
        

        <Snackbar open={openTwo} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
            Error Occured, Please Try Again Later
          </Alert>
        </Snackbar>

        <Snackbar open={openThree} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: '#f18e00', fontFamily: 'Varela Round'  }}>
            Checkout Confirmed!
          </Alert>
        </Snackbar>

        <Snackbar open={openFour} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
            Please Enter a Shipping Address
          </Alert>
        </Snackbar>
    </div>
  )
}

export default CartScreen