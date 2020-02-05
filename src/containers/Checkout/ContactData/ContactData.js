import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    length: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                },
                value: 'fastest',
            },
        },

        loading: false,
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })

        const formData = {};
        for (let dataElementIdentifier in this.state.orderForm) {
            formData[dataElementIdentifier] = this.state.orderForm[dataElementIdentifier].value;
        };

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };

        // this.setState({
        //     loading: true,
        //     totalPrice: 4,
        //     ingredients: {
        //         salad: 0,
        //         meat: 0,
        //         bacon: 0,
        //         cheese: 0,
        //     }
        // });

        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            };

            if (rules.length >= value.length && isValid) {
                isValid = true;
            } else {
                isValid = false;
            };

            return isValid;
        };
    };

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        const formElementsArray = [];

        // to convert objects to array for iteration
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        value={formElement.config.value}
                        elementConfig={formElement.config.elementConfig}
                        elementType={formElement.config.elementType}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        };

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };

};

export default ContactData;