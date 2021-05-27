import React, { useState } from 'react'
import { message } from 'antd'
import axios from '../commons/axios.js'
import Header from '../components/Header.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Collapse from 'react-bootstrap/Collapse';
import { Jumbotron, Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import image from '../pic/logo1.jpg';

function CustomerProfile(props) {

    const [name, setName] = useState(props.location.state.customer.name);
    const [familyName, setFamilyName] = useState(props.location.state.customer.familyName);
    const [password, setPassword] = useState(props.location.state.customer.password);
    const [open, setOpen] = useState(false);

    
    console.log(props.location.state.customer.familyName)
    const onUpdate=() => {

        console.log(familyName);
        const updateBody = {
            "name": name,
            "familyName": familyName,
            "email": props.location.state.customer.email,
            "password": password,
        }
        axios.post('/customer/update', updateBody).then(response => {
            if (response.data.success) {
                message.success("Customer detail updated successfully!")
                // console.log(name);
            } else {
                message.error(response.data.error)
                // console.log(name);
            }
        })

        setOpen(!open)
    }

  

    return (
        <div>
            <Header />
                    
            <Jumbotron style={{ width: '90%', backgroundColor: 'white', margin: 'auto' }}>
        
                        
                <img src={image} style={{ width: '30%', margin: 'auto' }} alt="logo" />
                

                <br />

                <h6>email: {props.location.state.customer.email}</h6>
                <h6>given name: {name}</h6>
                {/* <h6>family name: {(familyName) ? {familyName} : 'not set'} </h6> */}
                <h6>password: *** </h6>
                <h8> Do you like this? </h8>

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
                        <Form.Label>new given name </Form.Label>
                        <FormControl style={{fontSize:10}} type="string" placeholder="Please update you given name"
                            onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>new family name </Form.Label>
                        <Form.Control style={{fontSize:10}} type="email" placeholder="Please update your family name"
                            onChange={e => setFamilyName(e.target.value)} />
                        
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>new password</Form.Label>
                        <FormControl style={{fontSize:10}} placeholder="Please update your password"
                            onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>confirm new password</Form.Label>
                        <FormControl style={{fontSize:10}} placeholder="Please confirm your password"
                            onChange={e => setPassword(e.target.value)} />
                        </Form.Group> */}
                        {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I'm not a robot" />
                        </Form.Group> */}

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
                    onClick={() => setOpen(!open)}
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


