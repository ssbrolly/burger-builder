import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    if (props.inputtype === 'input') {
        inputElement = <input className={classes.InputElement} {...props} />

    } else if (props.inputtype === 'textarea') {
        inputElement = <textarea className={classes.InputElement} {...props} />

    } else {
        inputElement = <input className={classes.InputElement} {...props} />
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputElement}
        </div>
    );
};

export default Input;