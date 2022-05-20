import * as actionTypes from '../constants/navigationConstants';

export const orderCreated = () => (dispatch) => {
    dispatch({ type: actionTypes.ORDER_CREATED });
};

export const orderCreatedReset = () => (dispatch) => {
    dispatch({ type: actionTypes.ORDER_CREATED_RESET });
};

export const reviewCreated = () => (dispatch) => {
    dispatch({ type: actionTypes.REVIEW_CREATED });
};

export const reviewCreatedReset = () => (dispatch) => {
    dispatch({ type: actionTypes.REVIEW_CREATED_RESET });
};

export const reviewDeleted = () => (dispatch) => {
    dispatch({ type: actionTypes.REVIEW_DELETED });
};

export const reviewDeletedReset = () => (dispatch) => {
    dispatch({ type: actionTypes.REVIEW_DELETED_RESET });
};

export const notLoggedIn = () => (dispatch) => {
    dispatch({ type: actionTypes.NOT_LOGGED_IN });;
};

export const notLoggedReset = () => (dispatch) => {
    dispatch({ type: actionTypes.NOT_LOGGED_IN_RESET });;
};

