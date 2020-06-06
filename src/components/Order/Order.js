import React from 'react';
import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];

    for(let ingName in props.ingredients){
        ingredients.push({name: ingName, amount: props.ingredients[ingName]});
    }

    const ingOutput = ingredients.map(ing => (
        <span key={ing.name}
        style={{
            textTransform: 'capitalize',
            border: '1px solid #ccc',
            margin: '5px',
            padding: '5px',
            display: 'inline-block'
        }}>{ing.name} ({ing.amount})</span>
    ))

    return (
        <div className={classes.Order}>
            <span className={classes.Delete} onClick={props.clicked}>X</span>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;