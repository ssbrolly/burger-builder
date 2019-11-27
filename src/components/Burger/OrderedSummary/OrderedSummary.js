import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderedSummary extends Component {
    // componentDidUpdate() {
    //     console.log('[OrderedSummary] will update')
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKeys => {
            return (
                <li key={igKeys}>
                    <span style={{ textTransform: 'capitalize' }}>{igKeys}</span>
                    : {this.props.ingredients[igKeys]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Your Total is: ${this.props.total.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux >
        );
    };
};

export default OrderedSummary;




























