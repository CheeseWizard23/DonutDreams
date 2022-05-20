import authReducer from '../features/auth/authSlice'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { cartReducer } from './reducers/cartReducers';
import { checkoutOrderReducer, getOrdersReducer } from './reducers/orderReducer';
import { getDonutDetailsReducer, getDonutsReducer } from './reducers/donutReducer';
import { submitReviewReducer, getReviewsReducer, deleteReviewReducer } from './reducers/reviewReducer';
import { orderCreatedReducer, reviewCreatedReducer, reviewDeletedReducer, notLogginedInReducer } from './reducers/navigationReducers';

const reducer = combineReducers({
  auth: authReducer,
  notLoggedIn: notLogginedInReducer,
  cart: cartReducer,
  checkoutOrder: checkoutOrderReducer,
  getOrders: getOrdersReducer,
  getDonuts: getDonutsReducer,
  getDonutDetails: getDonutDetailsReducer,
  submitReview: submitReviewReducer,
  getReviews: getReviewsReducer,
  deleteReview: deleteReviewReducer,
  orderCreated: orderCreatedReducer,
  reviewCreated: reviewCreatedReducer,
  reviewDeleted: reviewDeletedReducer,
});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
