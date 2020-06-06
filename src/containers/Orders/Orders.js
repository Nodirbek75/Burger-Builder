import React, {Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spnner';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    componentDidMount(){
        this.props.onOrdersFetch(this.props.token, this.props.userId);
    }

    render(){
        let output = this.props.orders.map(order => (
                        <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                        clicked ={()=> this.props.onOrderDelete(order)}/>
                    ));
        if(this.props.loading){
            output = <Spinner />
        }
        return output;
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId   
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetch: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId)),
        onOrderDelete: (order) => dispatch(actionCreators.deleteOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));