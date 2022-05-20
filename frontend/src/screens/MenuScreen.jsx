import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import "./MenuScreen.css"
import Donut from "../components/Donut"
import { getDonuts as listDonuts } from '../app/actions/donutActions';
import Spinner from "../components/Spinner";

function Menu() {
  const dispatch = useDispatch();
  const getDonuts = useSelector(state => state.getDonuts)
  const { donuts, loading, error } = getDonuts

  useEffect(() => {
    dispatch(listDonuts())
  }, [dispatch])


  return (
    <div className="menuscreen">
      <h2 className="menuscreen_title">Available Donuts</h2>
      <div className="menuscreen_products">
        {loading ? <Spinner/> : error ? <h2 className="text title">{error}</h2> : 
          donuts.map((donut) => (
            <Donut key={donut._id}
              donutId={donut._id}
              name={donut.name}
              price={donut.price}
              description={donut.description}
              imageUrl={donut.imageUrl}
            /> )
        )}
      </div>
    </div>
  )
}

export default Menu