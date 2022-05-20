import * as actionTypes from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action ) => { 
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.donut === item.donut);

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.donut === existItem.donut ? item : x),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.donut !== action.payload)
            }
        case actionTypes.CART_RESET:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}