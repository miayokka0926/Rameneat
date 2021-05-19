import React, { useState, useMemo } from "react";
import { MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { message } from 'antd';

import axios from '../commons/axios.js';
import Menu from './Menu.js';

//render map
export default function LeafletMap(props) {

    let history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState('');

    const [position, setPosition] = useState(props.center);
    const eventHandlers = useMemo(
        (e) => ({
            dragend(e) {
                console.log(e.target.getLatLng())
                setPosition(e.target.getLatLng())
            },
            click() {
                handleShow()
            }
        }),
        [],
    )

    const onPark = () => {
        console.log(props.vendor.id, position.lat, position.lng)
        axios.post('/vendor/park/' + props.vendor.id, {
            location: [position.lat, position.lng],
            textAddress: address
        }).then(response => {
            message.success("vendor now parked!")
            history.push({ pathname: "/orders", state: { vendor: props.vendor } })
        })
    }

    const renderFiveVendors = props.vendors.map((vendor) => {
        return (
            <Menu key={vendor.id} position={vendor.location} snacks={props.snacks}
                vendor={vendor} customer={props.customer} />
        )
    })

    const renderCustomerMarker = (
        <Marker position={props.center} iconUrl={"https://static.thenounproject.com/png/780108-200.png"}>
            <Popup>Current Location</Popup>
        </Marker>
    )

    const renderVendorMarker = (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}>
        </Marker>
    )

    return (
        <div>

            <Modal show={show} onHide={handleClose} style={{ marginTop: "2vh" }} >
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Parking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address"
                                onChange={e => setAddress(e.target.value)} />
                            <Form.Text className="text=muted">
                                Enter your address
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onPark} style={{ color: '#FBE8A6', backgroundColor: '#F4976C', borderColor: '#F4976C' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


            <Map center={props.center} zoom={18} scrollWheelZoom={true}
                style={{ height: "90vh" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {(history.location.pathname === "/vendor") ? renderVendorMarker : <></>}
                {(history.location.pathname === "/customer") ? renderCustomerMarker : <></>}
                {(history.location.pathname === "/customer") ? renderFiveVendors : <></>}
            </Map>

        </div>

    )


}




