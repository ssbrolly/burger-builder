import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                const fetchedOrders = []
                fetchedOrders.push(Object.keys(res.data))
                // for (let key in res.data) {
                //     fetchedOrders.push({
                //         ...res.data[key],
                //         id: key
                //     })
                // }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    };

    render() {
        console.log(this.state.orders)
        return (
            <div>
                <Order orders={this.state.orders[0]} />
                <Order orders={this.state.orders[1]} />
            </div>
        );
    };
};
export default withErrorHandler(Orders, axios);