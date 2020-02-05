import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>
    };

    if (props.elementType === 'input') {
        inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />

    } else if (props.elementType === 'textarea') {
        inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />

    } else if (props.elementType === 'select') {
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        value={option.value}
                        key={option.value}>
                        {option.displayValue}
                    </option>
                ))};
            </select>
        );

    } else {
        inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value} />
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;