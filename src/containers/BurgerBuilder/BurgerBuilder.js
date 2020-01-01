import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderedSummary from '../../components/Burger/OrderedSummary/OrderedSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-burgerbuilder-fdc09.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(error => {
                this.setState({ error: true });
            });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        };

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
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
        };
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderedSummary = null;
        let burger = this.state.error ? <p>The App is Broken></p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
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

            orderedSummary = <OrderedSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                total={this.state.totalPrice}
            />
        };

        if (this.state.loading) {
            orderedSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderedSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axios);
