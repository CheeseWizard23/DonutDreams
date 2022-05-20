import "./CartItem.css"
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item,qtyChangeHandler, removeFromCartHandler }) => {
  return (
    <div className="cartitem">
        <div className="cartitem_image">
            <img src={item.imageUrl} alt={item.name} />
        </div>

        <Link to={`/Donut/${item.donut}`} className="cartitem_name">
            <p>{item.name}</p>
        </Link>

        <p className="cartitem_price">${item.price.toPrecision(3)}</p>

        <select
            value={item.qty}
            onChange={(e) => qtyChangeHandler(item.donut, e.target.value)}
            className="cartitem_select" >
            {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
        </select>

        <button className='cartitem_deletebutton' onClick={() => removeFromCartHandler(item.donut)}>
            <DeleteIcon />
        </button>
    </div>
  )
}

export default CartItem