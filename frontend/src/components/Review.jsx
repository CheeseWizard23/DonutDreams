import "../screens/ReviewScreen.css";
import Rating from '@mui/material/Rating';

const Review = ({ userId, userName, orderId, reviewDonuts, starRating, comment, reviewDate, numb }) => {
  return (
    <div className="big"> 
        <div className="reviewscreen_left">
            <div className="left_info">
                <p className="left_name">Review {numb+1} by {userName}</p>
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
            </div>
        </div>
    </div>
  )
}

export default Review