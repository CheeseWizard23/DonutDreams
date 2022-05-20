import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { submitReview, postReviewReset } from "../app/actions/reviewActions";

import "../screens/OrderScreen.css";

import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Order = ({ orderId, donuts, totalQty, totalPrice, date, shippingAddress, reviewCreated, numb }) => {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [starRating, setRatingValue] = useState(5);
  const [commentData, setCommentData] = useState({
    comment: '',
  })  
  const dispatch = useDispatch();

  const {comment} = commentData

  const userId = JSON.parse(localStorage.getItem('user'))
  const userName = userId.name;

  const reviewDetails = useSelector((state) => state.submitReview);
  const { error, success } = reviewDetails;

  const onChange = (e) => {
    setCommentData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenTwo(false);
    setOpenThree(false);
    setOpenFour(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const reviewDonuts = donuts.map(({ name, qty, price }) => ({ name, qty, price }))

    if (!starRating || !comment) {
      return setOpenTwo(true)
    }

    if (comment.trim().length === 0) {
      return setOpenFour(true)
    }

    const reviewData = {
      orderId,
      userName,
      reviewDonuts,
      starRating,
      comment
    }

    dispatch(submitReview(reviewData, userId._id))
  }

  const errorTing = async () => {
    await dispatch(postReviewReset())
    return setOpen(true)
  }
  const successTing = async () => {
    await dispatch(postReviewReset())
    return setOpenThree(true)
  }

  if(success) {
    successTing();
  }

  if(error) {
    errorTing()
  }

  return (
    <div className="big">
    <div className="orderscreen_left">
      <div className="left_info">
        <p className="left_name">Order {numb+1}</p>
        {donuts.map(donut => (
          <div className="onedonut">
              <p className="orderattribute"><b>{donut.name}</b></p>
              <p className="orderattribute">Qty: {donut.qty}</p>
              <p className="orderattribute">Price: ${donut.price.toPrecision(3)}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="orderscreen_right">
      <div className="right_info">
        <p className="order_varela">
          Date: <span>{date.slice(0, 10)}</span>
        </p>

        <p className="order_varela">
          Total Quantity: <span>{totalQty}</span>
        </p>

        <p className="order_varela">
          Total Price: <span>${totalPrice.toPrecision(3)}</span>
        </p>

        <p className="order_varela">
          Shipping Address: <span>{shippingAddress}</span>
        </p>

        <p className="order_varela">
          Star Review
          <span>
            <Rating
            name="simple-controlled"
            value={starRating}
            defaultValue={5}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          /></span>
        </p>
        <p>
            Comment: 
            <span>
              <input className="reviewInput" type="text" id="comment" name="comment" value={comment} onChange={onChange}/>
            </span>
        </p>   
        <p>
          {reviewCreated ? <button type="submitButtonDisabled" className="submitButtonDisabled" disabled>Only one review is allowed per order</button> : 
          <button type="button" className="submitButton" onClick={onSubmit}>Create Review</button>}
        </p>
      </div>
    </div>
    <Snackbar open={openTwo} autoHideDuration={1000} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
        Please Fill Out all Required Fields (Comment and Star Review)
      </Alert>
    </Snackbar>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
        Only One review is allowed per Order. Please delete your review for this order in 'My Reviews' and try again.
      </Alert>
    </Snackbar>
    <Snackbar open={openThree} autoHideDuration={1000} onClose={handleClose}>
      <Alert severity="success" onClose={handleClose} sx={{ width: '100%', backgroundColor: '#f18e00', fontFamily: 'Varela Round'  }}>
        Review Successfully Created
      </Alert>
    </Snackbar>
    <Snackbar open={openFour} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round' }}>
        Please add text in the comment field
      </Alert>
    </Snackbar>
  </div>
  )
}

export default Order