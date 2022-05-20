import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import "./MenuScreen.css"
import { getReviews as listReviews } from '../app/actions/reviewActions';
import Spinner from "../components/Spinner";

import "./ReviewScreen.css"
import Review from "../components/Review"

const ReviewScreen = () => {
    const dispatch = useDispatch();
    const getReviews = useSelector(state => state.getReviews)
    const { reviews, loading, error } = getReviews
  
    useEffect(() => {
      dispatch(listReviews())
    }, [dispatch])

    return (
    <div className="reviewscreen">
      <h2 className="title">All Reviews</h2>
        {loading ? <Spinner/> : error ? <h2>{error}</h2> : reviews.length === 0 ? <h2 className="text">There are no Reviews Currently.</h2> :
          reviews.map((review) => (
            <Review key={review._id}
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

export default ReviewScreen