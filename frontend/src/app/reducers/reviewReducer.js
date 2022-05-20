import * as actionTypes from '../constants/reviewConstants'

export const submitReviewReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case actionTypes.POST_REVIEW_REQUEST:
            return {
                loading: true,
                error: false,
                review: {},
            }
        case actionTypes.POST_REVIEW_REQUEST_SUCCESS:
            return {
                loading: false,
                success: true,
                review: action.payload
            }
        case actionTypes.POST_REVIEW_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.POST_REVIEW_REQUEST_RESET:
            return {
                ...state,
                review: {},
                loading: false,
                success: false,
                error: false,
            };
        default: 
            return state;
    }
}

export const getReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_REVIEWS_REQUEST:
            return {
                loading: true,
                reviews: []
            }
        case actionTypes.GET_REVIEWS_REQUEST_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        case actionTypes.GET_REVIEWS_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.GET_REVIEWS_REQUEST_RESET:
            return {
                reviews: [],
                success: false,
            };
        default: 
            return state;
    }
}

export const deleteReviewReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                review: {}
            }
        case actionTypes.DELETE_REVIEW_REQUEST_SUCCESS:
            return {
                loading: false,
                review: action.payload,
                success: true,
            }
        case actionTypes.DELETE_REVIEW_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: true,
            }
        case actionTypes.DELETE_REVIEW_REQUEST_RESET:
            return {
                review: {},
                success: false,
                loading: false,
            };
        default: 
            return state;
    }
}