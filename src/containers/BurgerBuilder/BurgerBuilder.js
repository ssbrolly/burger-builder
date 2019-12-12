import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderedSummary from '../../components/Burger/OrderedSummary/OrderedSummary';
import axios from '../../axios-orders';
// import 1 from '1'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // };

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },

        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    };

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarzenegger',
                address: {
                    street: 'Teststreet 1',
                    zipcode: '12345',
                    country: 'Yourmany',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fasest',
        };

        axios.post('orders.json', order)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        let newPrice = { ...this.state.totalPrice };
        newPrice = updatedPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: Math.round(newPrice * 100) / 100
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] >= 1) {
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = updatedCount;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: Math.round(newPrice * 100) / 100
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderedSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        total={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
