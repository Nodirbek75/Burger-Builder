import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients.js/BurgerIngredients';
import PropTypes from 'prop-types';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map(( _ , i) => {
           return <BurgerIngredients key={ingKey+i} type={ingKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please, start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type={"bread-top"} />
            {transformedIngredients}
            <BurgerIngredients type={"bread-bottom"} />
        </div>
    )
}

burger.propTypes ={
    ingredients: PropTypes.object.isRequired
}

export default burger;