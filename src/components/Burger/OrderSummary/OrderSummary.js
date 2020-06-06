import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    render(){
        const ingredients = Object.keys(this.props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
                </li>
            ) 
        });
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A deligios burger with the following ingredients</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to Checkout</p>
                <Button clicked={this.props.purchaseCancelled} btnType={"Danger"}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType={"Success"}>CONTINUE</Button>
            </Auxiliary>
        );
    }
} 

export default OrderSummary;