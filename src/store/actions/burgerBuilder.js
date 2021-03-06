import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

const setIngredients = ingredients => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'Use your database url here' ) // USE YOUR DATABSE URL
            .then( response => {
                dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredientsFail());
            } );
    }
}
