import React from 'react';
import Aux from '../../../hoc/Aux';

const orderedSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredient).map(igKeys => {
        return (<li key={igKeys}>
            <span style={{ textTransform: 'capitalize' }}>{igKeys}</span>
            : {props.ingredient[igKeys]}
        </li>)
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
};

export default orderedSummary;






























