import * as React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";

import { getDonutDetails } from "../app/actions/donutActions";
import { addToCart } from "../app/actions/cartActions";
import { notLoggedIn } from "../app/actions/navigationActions"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './DonutScreen.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DonutScreen = ({ history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const donutDetails = useSelector((state) => state.getDonutDetails);
  const { loading, error, donut } = donutDetails;

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const dispatchLogin = async () =>  {
      await dispatch(notLoggedIn());
    }

    if (!user) {
      dispatchLogin();
      return navigate('/Login')
    }

    if (donut && id !== donut._id) {
      dispatch(getDonutDetails(id));
    }
  }, [user, navigate, dispatch, donut, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(donut._id, qty));
    setOpen(true);
  };

  return (
    <div className="donutscreen">
      {loading ? <Spinner /> : error ? <h2 className='text'>An Error Has Occured, Please Try Again Later</h2> : (
        <>
          <div className="donutscreen_left">
            <div className="left_image">
              <img src={donut.imageUrl} alt={donut.name}/>
            </div>

            <div className="left_info">
              <p className="left_name">{donut.name}</p>
              <p className="donut_varela">${parseFloat(donut.price).toPrecision(3)}</p>
              <p>{donut.description}</p>
            </div>
          </div>

          <div className="donutscreen_right">
            <div className="right_info">
              <p className="donut_varela">
                Price: <span>${parseFloat(donut.price).toPrecision(3)}</span>
              </p>

              <p className="donut_varela">
                Status: <span>{donut.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
              </p>

              <p className="donut_varela">
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(donut.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>

              <p>
                <button type="button" className="cartButton" onClick={addToCartHandler}>Add To Cart</button>
              </p>
            </div>
          </div>
        </>
      )}

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: '#f18e00', fontFamily: 'Varela Round'  }}>
            Item Successfully Added to Cart
          </Alert>
        </Snackbar>
    </div>
     
     
  )
}

export default DonutScreen