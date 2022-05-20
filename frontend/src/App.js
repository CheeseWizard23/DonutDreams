import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'

import MenuScreen from './screens/MenuScreen'
import DonutScreen from './screens/DonutScreen'
import CartScreen from './screens/CartScreen'
import OrderScreen from './screens/OrderScreen'
import ReviewScreen from './screens/ReviewScreen'
import UserReviewScreen from './screens/UserReviewScreen'
import PageNotFound from './screens/PageNotFound'

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<MenuScreen />} />
            <Route exact path='/donut/:id' element={<DonutScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/orders' element={<OrderScreen />} />
            <Route path='/reviews' element={<ReviewScreen />} />
            <Route path='/user-reviews' element={<UserReviewScreen />} />
            <Route path='*' exact={true} element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
