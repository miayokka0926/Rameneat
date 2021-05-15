// customer main page, allow customers to view vendor location and its menu before login, and
// allow customers to place and view orders after login.
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Divider, Drawer, PageHeader } from "antd";
import axios from "../commons/axios";

import OrderList from "../components/OrderList.js";
import LeafletMap from "../components/LeafletMap.js";
import Header from "../components/Header.js";


function CustomerMain(props) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const handleDrawerClose = () => setDrawerVisible(false);
  const handleDrawerShow = () => setDrawerVisible(true);
  const [orders, setOrders] = useState([]);
  const [snacks, setSnacks] = useState([]);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  // display page header and 'view orders' button.
  useEffect(() => {
    if (props.location.state.customer) {
      console.log(props.location.state.position);
      console.log(props.location.state.vendors);
      axios
        .get("/order?customer=" + props.location.state.customer.id)
        .then((response) => {
          setOrders(response.data.allOrders);
        });
      setTitle("Welcome back, " + props.location.state.customer.name);
      setOptions([
        <Button
          variant="outline-light"
          key="1"
          style={{ fontSize: 15, backgroundColor: "#F4976C" }}
          onClick={handleDrawerShow}
        >
          view Orders
        </Button>,
      ]);
    } else {
      setTitle("Welcome!");
    }
    axios.get("/snack").then((response) => {
      setSnacks(response.data.snacks);
    });
  }, [
    props.location.state.position,
    props.location.state.vendors,
    props.location.state.customer,
  ]);
  //render out the page UI
  return (
    <div>
      <PageHeader title={title} extra={options}></PageHeader>
      <Drawer
        style={{ color: "orange" }}
        visible={drawerVisible}
        closable={true}
        onClose={handleDrawerClose}
        width={"70vw"}
      >
        <h3 style={{ color: "#F4976C" }}>My orders</h3>
        <Divider />
        <OrderList orders={orders} />
  </Drawer>
      <LeafletMap
        center={props.location.state.position}
        vendors={props.location.state.vendors}
        snacks={snacks}
        customer={props.location.state.customer}
      />
    </div>
  );
}

export default CustomerMain;