import React from 'react';
import classes from './Spinner.css'

const spinner = () =>{
    return (
        <div className={classes.LoaderWrapper}>
            <div className={classes.Loader}></div>
        </div>
    );
}

export default spinner;