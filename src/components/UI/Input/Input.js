import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    if (props.elementType === 'input') {
        inputElement = <input
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />

    } else if (props.elementType === 'textarea') {
        inputElement = <textarea
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />

    } else if (props.elementType === 'select') {
        inputElement = (
            <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        value={option.value}
                        key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );

    } else {
        inputElement = <input
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value} />
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputElement}
        </div>
    );
};

export default Input;