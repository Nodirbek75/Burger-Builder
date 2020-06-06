import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spnner';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler  from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component{
    state = {
        inputForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'normal', displayValue: 'Normal'},
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'},
                        ]
                    },
                    validation: {},
                    value: 'normal',
                    valid: true
                }
        },
        loading: false,
        formIsValid: false
    }

    inputChangedHandler = (event, id) => {
        const updatedInputElement = updateObject(this.state.inputForm[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.inputForm[id].validation),
            touched: true
        })

        const updatedInputForm = updateObject(this.state.inputForm, {
            [id]: updatedInputElement
        });

        let formIsValid = true;
        for(let elementId in updatedInputForm){
            formIsValid = updatedInputForm[elementId].valid && formIsValid;
        }
        this.setState({inputForm: updatedInputForm, formIsValid: formIsValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};

        for(let key in this.state.inputForm){
            formData[key] = this.state.inputForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.ttlPrice,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);

    }

    render(){
        let inputArray = [];
        for(let key in this.state.inputForm){
            inputArray.push({
                id: key,
                config: this.state.inputForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
                        {inputArray.map(el => (
                            <Input  
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                invalid={!el.config.valid}
                                shouldValidate={el.config.validation} 
                                touched={el.config.touched}
                                changed={(event) => this.inputChangedHandler(event, el.id)}/>
                        ))}
                        <Button btnType={'Success'} disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                    )
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));