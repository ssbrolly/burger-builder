import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6,
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // };

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice})
    };
    
    removeIngredientHandler = (type) => {
        
    }
    
    render() {
        console.log(this.state.ingredients)
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </Aux>
        );
    };
};

export default BurgerBuilder;






