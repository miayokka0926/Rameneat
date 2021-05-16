import React from 'react'
import { Divider, Drawer, PageHeader } from "antd";
import { useState, useEffect } from "react";
import OrderList from "../components/OrderList.js";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'

export default function Header(props) {

    let history = useHistory();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const handleDrawerClose = () => setDrawerVisible(false);
    const handleDrawerShow = () => setDrawerVisible(true);
    const [orders] = useState([]);
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([]);

    const [target, setTarget] = useState("");
    useEffect(() => {
        if ( props.customer && history.location.pathname === "/customer") {
            setTitle('Welcome, ' + props.customer.name + '!')
            setTarget('customer');
            setOptions([
                <Button
                    variant = "outline-light"
                    key = "0"
                    style = {{ fontSize:13, backgroundColor: "#F4976C"}}
                    onClick ={() => {
                        history.push('/profile', {
                            //push customer info to /profile page
                            customer: props.customer, 
                            orders: props.orders
                        });
                    }}>My profile
                </Button>,
                <Button
                  variant="outline-light"
                  key="1"
                  style={{ fontSize: 13, backgroundColor: "#F4976C" }}
                  onClick={handleDrawerShow}
                >
                  view Orders
                </Button>
              ]);
        }else if ( history.location.pathname === "/profile"){
            setTitle('Settings')
            setOptions([
                <Button
                variant="outline-light"
                  key="0"
                  style={{ fontSize: 15, backgroundColor: "#F4976C" }}
                  onClick={() => {
                      history.goBack()
                  }}
                >
                  Back
                </Button>

            ])

        }
        else {
            setTitle("Welcome!");
            setOptions([
                <Button
                  variant="outline-light"
                  key="1"
                  style={{ fontSize: 15, backgroundColor: "#F4976C" }}
                  onClick={() => {
                      history.push('./')
                  }}
                >
                  login
                </Button>
            ])
        }
    }, []);

  

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
                <OrderList
                target = {target}
                orders={props.orders} />
    </Drawer>
        </div>
    )
}
