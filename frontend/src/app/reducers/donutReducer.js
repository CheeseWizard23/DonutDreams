import * as actionTypes from '../constants/donutConstants'

export const getDonutsReducer = (state = { donuts: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_DONUTS_REQUEST:
            return {
                loading: true,
                donuts: []
            }
        case actionTypes.GET_DONUTS_SUCCESS:
            return {
                loading: false,
                donuts: action.payload
            }
        case actionTypes.GET_DONUTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default: 
            return state;
    }
}

export const getDonutDetailsReducer = (state = { donut: {} }, action) => {
    switch (action.type) {
      case actionTypes.GET_DONUT_DETAILS_REQUEST:
        return {
          loading: true,
        };
      case actionTypes.GET_DONUT_DETAILS_SUCCESS:
        return {
          loading: false,
          donut: action.payload,
        };
      case actionTypes.GET_DONUT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case actionTypes.GET_DONUT_DETAILS_RESET:
        return {
          donut: {},
        };
      default:
        return state;
    }
  };