import * as React from 'react'
import { getOrders as listOrders } from "../app/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";

import { orderCreatedReset } from "../app/actions/navigationActions"

import './OrderScreen.css'
import Order from "../components/Order"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DonutScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem('user'))
  const userId = userDetails._id

  const getOrderDetails = useSelector((state) => state.getOrders);
  const { loading, error, orders } = getOrderDetails;

  const OrderCreatedDetails = useSelector((state) => state.orderCreated);
  const { created } = OrderCreatedDetails;

  const { user } = useSelector((state) => state.auth)

  const close_all = () => {
    setOpen(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    close_all();
  };

  useEffect(() => {
    if (!user) {
      return navigate('/Login')
    }

    if (created) {
      dispatch(orderCreatedReset())
      setOpen(true);
    }

    dispatch(listOrders(userId))

  }, [user, userId, navigate, dispatch, created]);

  return (
    <div className="orderscreen">
      <h2 className="text title">My Orders</h2>
      {loading ? <Spinner /> : error ? <h2 className="text">An Error has Occured, Please try again.</h2> : orders.length === 0 ? <h2 className="text">You have made no Orders.</h2> : (
        orders.map(order => (
          <Order key={order._id}
          orderId={order._id}
          donuts={order.donuts}
          totalQty={order.totalQuantity}
          totalPrice={order.totalPrice}
          date={order.date_added}
          shippingAddress={order.shippingAddress}
          reviewCreated={order.reviewCreated}
          numb={orders.indexOf(order)}
          /> )
        ))
      }

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: '#f18e00', fontFamily: 'Varela Round'  }}>
          Checkout Confirmed!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default DonutScreen