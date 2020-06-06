import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.ORDER_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true});
        case actionTypes.ORDER_BURGER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.ORDER_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true, error: null})
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders, loading: false, error: null});
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false, error: action.error});
        default:
            return state
    }
}

export default reducer;