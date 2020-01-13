import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalcode: '',
        },
        loading: false,
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

    render() {
        let form = (
            <form >
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button
                    clicked={this.orderHandler}
                    btnType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }

};

export default ContactData;