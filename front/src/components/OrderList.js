import React from 'react';
import OrderBrief from './OrderBrief.js';

export default function OrderList(props) {

    const renderOrders = props.orders.map((order) => {
        return (<OrderBrief key={order._id} order={order} vendor={order.vendor} />)
    })

    return (
        <div>
            {renderOrders}
        </div>
    )
}