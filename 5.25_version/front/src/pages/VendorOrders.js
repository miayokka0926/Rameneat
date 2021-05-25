//display full order list for vendors
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Header from '../components/Header.js';
import OrderList from '../components/OrderList.js';


export default function VendorOrders(props) {

    const [target, setTarget] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (window.location.pathname === "/orders") {
            setTarget("vendor")
        }
    }, [])

    return (
        <div>
            <Header vendor={props.location.state.vendor} />
            <div style={{ marginLeft: "3vw", alignItems: "center" }}>

                <ButtonGroup size="lg">
                    <Button style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6' }} onClick={() => setStatus("&status=outstanding")}>Outstanding</Button>
                    <Button style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6' }} onClick={() => setStatus("&status=fulfilled")}>Fulfilled</Button>
                    <Button style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6' }} onClick={() => setStatus("&status=completed")}>Completed</Button>
                </ButtonGroup>

            </div>
            <OrderList id={props.location.state.vendor.id} target={target} status={status} />
        </div>
    )
}
