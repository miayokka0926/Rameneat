import React from 'react'
import { Divider, Drawer, PageHeader } from "antd";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import OrderList from "../components/OrderList.js";

// NEED TO IMPROVE MENU FROM DROPDOWN BUTTON
// import Menu from './Menu.js';

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
        if (props.customer && history.location.pathname === "/customer") {
            setTitle('Welcome to RAMEN EAT, ' + props.customer.name + '!')
            setTarget('customer');
            setOptions([
                <ButtonGroup style={{ fontSize: 13, backgroundColor: "#F4976C" }}>

                    <DropdownButton
                        style={{ backgroundColor: "#F4976C", borderBottomColor: "#F4976C" }}
                        variant="outline-light"
                        key="0"
                        title="Order from the nearest vendors">

                        {props.vendors.map((vendor) => (
                            <Dropdown.Item title={vendor.name} >
                                {vendor.name}
                            </Dropdown.Item>
                        ))}

                    </DropdownButton>

                    <Button
                        variant="outline-light"
                        key="1"
                        style={{ backgroundColor: "#F4976C" }}
                        onClick={() => {
                            history.push('/profile', {
                                //push customer info to /profile page
                                customer: props.customer,
                                orders: props.orders
                            });
                        }}>
                        My profile
                </Button>

                    <Button
                        variant="outline-light"
                        key="2"
                        style={{ backgroundColor: "#F4976C" }}
                        onClick={handleDrawerShow}
                    >
                        view Orders
                </Button>
                </ButtonGroup>
            ]);
        } else if (history.location.pathname === "/profile") {
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
                width={"70vw"}>

                <h3 style={{ color: "#F4976C" }}>My orders</h3>
                <Divider />
                <OrderList
                    id={props.customer.id} 
                    target={target}
                    order={props.orders} />
            </Drawer>
        </div>
    )
}
