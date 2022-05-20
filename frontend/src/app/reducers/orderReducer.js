import * as actionTypes from '../constants/orderConstants'

export const checkoutOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case actionTypes.POST_ORDER_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.POST_ORDER_REQUEST_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.POST_ORDER_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.POST_ORDER_REQUEST_RESET:
            return {
                ...state,
                order: {},
                loading: false,
                success: false,
            };
        default: 
            return state;
    }
}

export const getOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case actionTypes.GET_ORDERS_SUCCESS:
            return {
                loading: false,
                success: true,
                orders: action.payload
            }
        case actionTypes.GET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.GET_ORDERS_RESET:
            return {
                ...state,
                orders: [],
                loading: false,
            };
        default: 
            return state;
    }
}