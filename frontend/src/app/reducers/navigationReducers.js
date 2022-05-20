import * as actionTypes from '../constants/navigationConstants'

export const orderCreatedReducer = (state = { created: false }, action) => {
    switch (action.type) {
        case actionTypes.ORDER_CREATED:
            return {
              created: true
            }
        case actionTypes.ORDER_CREATED_RESET:
            return {
              created: false
            }
        default: 
            return state;
    }
}

export const reviewCreatedReducer = (state = { created: false }, action) => {
  switch (action.type) {
      case actionTypes.REVIEW_CREATED:
          return {
            created: true
          }
      case actionTypes.REVIEW_CREATED_RESET:
          return {
            created: false
          }
      default: 
          return state;
  }
}
export const reviewDeletedReducer = (state = { deleted: false }, action) => {
  switch (action.type) {
      case actionTypes.REVIEW_DELETED:
          return {
            deleted: true
          }
      case actionTypes.REVIEW_DELETED_RESET:
          return {
            deleted: false
          }
      default: 
          return state;
  }
}

export const notLogginedInReducer = (state = { notLogged: false }, action) => {
  switch (action.type) {
      case actionTypes.NOT_LOGGED_IN:
          return {
            notLogged: true
          }
      case actionTypes.NOT_LOGGED_IN_RESET:
          return {
            notLogged: false
          }
      default: 
          return state;
  }
}