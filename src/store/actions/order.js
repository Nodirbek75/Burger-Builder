import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderBugerSuccess = (id, orderData ) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const orderBurgerFail = (error) => {
    return{
        type: actionTypes.ORDER_BURGER_FAIL,
        error: error
    }
}

export const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post( 'orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch(orderBugerSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch(orderBurgerFail(error));
            } );
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+query)
            .then(res=>{
                const fetchedData = [];
                for (let key in res.data){
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}

export const deleteOrder = (order) => {
    return dispatch => {
        axios.delete('/orders/'+order.id+'.json')
        .then(response => {
            dispatch(fetchOrders());
        })
    };
}