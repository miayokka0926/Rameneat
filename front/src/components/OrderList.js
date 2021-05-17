import React, { useState, useEffect, Component } from 'react';
import axios from '../commons/axios.js';
// import URLs from '../url';
import io from "socket.io-client";
import { Empty, message } from 'antd';


import OrderBrief from "./OrderBrief.js";
//import { response } from 'express';

function Orders(props) {

  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('')
  const id = props.id

  useEffect(() => {
    if (props.status) {
      setStatus(props.status)
    }
    async function fetchData() {
      // axios.get("/order?" + props.target + "=" + id).then(response => {
      axios.get("/order?" + props.target + "=" + id + props.status).then(response => {
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

  // componentDidMount() {
  //   const socket = io('${URLs.socketURL}/socket', { transports: ['websocket'] });
  //   // const socket = io('/socket', { transports: ['websocket'] });

  //   socket.on("newOrder", (order) => {
  //     console.log("insertion by customer");
  //     this.setState({ orders: [...this.state.orders, order] });

  //   });

  //   socket.on("updateOrder", (id) => {
  //     console.log("update by customer");
  //     console.log(id)
  //   });

  //   socket.on("deleteOrder", (id) => {
  //     console.log("delete by customer");
  //     const updateOrders = this.state.orders.filter((order) => {
  //       return order._id !== id;
  //     });
  //     this.setState({ orders: updateOrders });
  //   });
  // }

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

