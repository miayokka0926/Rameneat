import React, { useState } from 'react'
import { message } from 'antd'
import axios from '../commons/axios.js'
import Header from '../components/Header.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';


//import { Card, Modal } from "antd";
import Collapse from 'react-bootstrap/Collapse';

//import { Button } from "react-bootstrap";
//import { Divider, Drawer, PageHeader } from "antd";
//import axios from "../commons/axios";

//import OrderList from "../components/OrderList.js"
//import { useState, useEffect } from 'react';
import { Jumbotron, Button, OverlayTrigger, Tooltip, Form, FormControl } from 'react-bootstrap';
//import Collapse from 'react-bootstrap/Collapse';
//import { message, Typography } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import image from '../pic/logo1.jpg';

function CustomerProfile(props) {

    //const [ form ] = Form.useForm();
    //const { Link } = Typography;

    //const [givenName, setGivenName] = useState(props.location.state.customer.givenName);
    //const [familyName, setFamilyName] = useState(props.location.state.customer.familyName);
    const [email, setEmail] = useState(props.location.state.customer.email);
    const [password, setPassword] = useState(props.location.state.customer.password);
    //const [disable, setDisable] = useState(true);

    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [name, setName] = useState(props.location.state.customer.name);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    //const [modalVisible, setModalVisible] = useState(false);
    //const handleClose = () => setModalVisible(false);
    //const handleShow = () => setModalVisible(true);

    //const [setDrawerVisible] = useState(false);
    //const handleDrawerShow = () => setDrawerVisible(true);

    const onUpdate=() => {
        const updateBody = {
            //"givenName": givenName,
            "name": name,
            "email": email,
            "password": password
        }
        axios.post('/customer/update', updateBody).then(response => {
            if (response.data.success) {
                message.success("Customer detail updated successfully!")
                console.log(name);
            } else {
                message.error(response.data.error)
                console.log(name);
            }
        })
    }

  

    return (
        <div>
            <Header />
                    
            <Jumbotron style={{ width: '90%', backgroundColor: 'white', margin: 'auto' }}>
        
                        
                <img src={image} style={{ width: '30%', margin: 'auto' }} alt="logo" />
                

                <br />

                <h6>email: {props.location.state.customer.email}</h6>
                <h6>name: {props.location.state.customer.name}</h6>
                <h6>password: ***</h6>

                <br />

        
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="outline-light"
                    key="1"
                    style={{ fontSize: 15, backgroundColor: "#F4976C" }}>
                    change information
                </Button>

                <Collapse in={open}>
                    <p>
                    <Form>
                        <br />

                        <Form.Group >
                        <Form.Label>new name</Form.Label>
                        <FormControl style={{fontSize:10}} type="string" placeholder="Please update your name"
                            onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>new email</Form.Label>
                        <Form.Control style={{fontSize:10}} type="email" placeholder="Please update your email"
                            onChange={e => setEmail(e.target.value)} />
                        
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>new password</Form.Label>
                        <FormControl style={{fontSize:10}} type="password" placeholder="Please update your password"
                            onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>confirm new password</Form.Label>
                        <FormControl style={{fontSize:10}} type="password" placeholder="Please confirm your password"
                            onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I'm not a robot" />
                        </Form.Group>
                    </Form>
                    
                    
                    <Button
                    style={{ backgroundColor: "orange", marginLeft: "12%" }}
                    variant="primary"
                    onClick={onUpdate}
                    >
                    update
                    </Button>


                    <Button
                    style={{ backgroundColor: "orange", marginLeft: "30%" }}
                    variant="primary"
                    onClick={() => setClose(!close)}
                    >
                    Cancel
                    </Button>


                    </p>
                </Collapse>

                    
            </Jumbotron>            
        
        </div>
        
    );
}

export default CustomerProfile