import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
class Checkout extends Component{

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render(){
        let summary = <Redirect to='/'/>
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to={'/'} /> : null;
            summary = (
                <div style={{width: '100%', margin:'auto'}}>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutContinue={this.checkoutContinueHandler}
                    checkoutCancel={this.checkoutCancelHandler}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapPropsToState = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapPropsToState)(Checkout);