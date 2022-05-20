import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./MenuScreen.css"
import { getUserReviews as listUserReviews } from '../app/actions/reviewActions';
import { notLoggedIn } from '../app/actions/navigationActions';
import Spinner from "../components/Spinner";


import "./ReviewScreen.css"
import UserReview from "../components/UserReview"

const UserReviewScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getReviews = useSelector(state => state.getReviews)
    const { reviews, loading, error } = getReviews
  
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            dispatch(notLoggedIn())
            navigate('/login')
        } else {
            dispatch(listUserReviews(user._id))
        }
    }, [dispatch, user, navigate])

    return (
    <div className="reviewscreen">
        <h2 className="title">My Reviews</h2>
        {loading ? <Spinner/> : error ? <h2 className="text">{error}</h2> : reviews.length === 0 ? <h2 className="text">You have made no Reviews.</h2> :
          reviews.map((review) => (
            <UserReview key={review._id}
              reviewId={review._id}
              userId={review.userId}
              userName={review.userName}
              orderId={review.orderId}
              reviewDonuts={review.reviewDonuts}
              starRating={review.starRating}
              comment={review.comment}
              reviewDate={review.reviewDate}
              numb={reviews.indexOf(review)}
            /> )
        )}
    </div>
    )
}

export default UserReviewScreen