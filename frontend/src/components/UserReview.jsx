import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { removeReview, removeReviewReset } from "../app/actions/reviewActions";
import { getUserReviews as listUserReviews } from '../app/actions/reviewActions';
import { reviewDeleted, reviewDeletedReset } from '../app/actions/navigationActions';

import "../screens/ReviewScreen.css";
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Review = ({ key, reviewId, userId, userName, orderId, reviewDonuts, starRating, comment, reviewDate, numb }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { deleted } = useSelector((state) => state.reviewDeleted)

    const onSubmit = async (e) => {
        e.preventDefault();

        await dispatch(removeReview(userId, reviewId, orderId));
        await dispatch(removeReviewReset());
        await dispatch(listUserReviews(userId))
        dispatch(reviewDeleted())
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if(deleted) {
            dispatch(reviewDeletedReset());
            setOpen(true);
        }
    }, [dispatch, deleted])

    return (
        <div className="big"> 
            <div className="reviewscreen_left">
                <div className="left_info">
                    <p className="left_name">Review {numb + 1}</p>
                    {reviewDonuts.map(reviewDonut => (
                        <div className="onedonut">
                            <p className="reviewattribute"><b>{reviewDonut.name}</b></p>
                            <p className="reviewattribute">Qty: {reviewDonut.qty}</p>
                            <p className="reviewattribute">Price: ${reviewDonut.price.toPrecision(3)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="reviewscreen_right">
                <div className="right_info">
                <p className="review_varela">
                    Date: <span>{reviewDate.slice(0, 10)}</span>
                </p>

                <p className="review_varela">
                    Star Review
                    <span>
                        <Rating
                        name="disabled"
                        value={starRating} readOnly />
                    </span>
                </p>
                <p>
                    Comment: 
                    <span>
                        {comment}
                    </span>
                </p>

                <p>
                    <button className="deleteReview" type="button" onClick={onSubmit}>Delete Review</button>
                </p>
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose} sx={{ width: '100%', backgroundColor: '#f18e00', fontFamily: 'Varela Round'  }}>
                    Review Successfully Deleted!
                 </Alert>
            </Snackbar>
        </div>
    )
}

export default Review