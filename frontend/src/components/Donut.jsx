import "./Donut.css";
import { Link } from "react-router-dom";

const Donut = ({ imageUrl, name, price, description, donutId }) => {
  return (
    <div className="donut">
      <img src={imageUrl} alt={name} />

      <div className="donut_info">
        <p className="info_name">{name}</p>

        <p className="info_description">{description.substring(0, 100)}...</p>

        <p className="info_price">${price.toPrecision(3)}</p>

        <Link to={`/donut/${donutId}`} className="info_button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Donut;