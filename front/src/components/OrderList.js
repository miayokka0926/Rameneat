import React, { useState, useEffect, Component } from 'react';
import axios from '../commons/axios.js';
// import URLs from '../url';
import io from "socket.io-client";
import { Empty, message } from 'antd';

import OrderBrief from "./OrderBrief.js";

function Orders(props) {

  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('')
  const id = props.id

  useEffect(() => {
    if (props.status) {
      setStatus(props.status)
    }

    async function fetchData() {
      axios.get("/order?" + props.target + "=" + id + status).then(response => {
        if (response.data.success) {
          setOrders(response.data.allOrders)
        } else {
          setOrders([])
          message.info("No outstanding order found");
        }
      }).catch(error => {
        setOrders([]);
      })
    }
    fetchData()
  }, [id, orders, props.target, props.status])

  const renderOrders = orders.map((order) => {
    return (
      <OrderBrief
        key={order._id}
        order={order} />
    )
  })

  return (
    <div>
      {
        // can be written
        (orders.length > 0) ? renderOrders
          : <Empty description={<span> Currently no orders</span>} />
      }
    </div>
  )

}


export default class OrderList extends Component {

  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%', margin: 'auto', "marginTop": "7%" }}>
        <Orders 
          id={this.props.id}
          orders={this.state.orders}
          target={this.props.target}
          status={this.props.status} />

      </div>
    )
  }
}
