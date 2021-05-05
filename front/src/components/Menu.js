import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputNumber, Card, message } from 'antd';
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Modal, Button } from 'react-bootstrap';
import axios from '../commons/axios';



import image from '../components/logo.png';


const { Meta } = Card;
export default function Menu(props) {
    const vendorIcon = new Icon({
        iconUrl: image,
        iconSize: [66, 66],
    })

    const [order, setOrder] = useState([]);
    const [modalVisible, setModalVisible] = useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);
    }

    let history = useHistory();

    const onSubmit = () => {
        if (!props.customer) {
            message.error("you need to log in to place an order")
            history.goBack()
        } else {
            var submitOrder = []
            for (var i = 0; i < order.length; i++) {
                if (Number.isFinite(order[i])) {
                    submitOrder.push({
                        "name": props.snacks[i].name,
                        "qty": order[i]
                    })
                }
            }
            console.log(submitOrder)
            if (submitOrder.length === 0) {
                setModalVisible(false)
                message.error("You must enter at least one snack!")
            } else {
                axios.post('/order/create', {
                    customer: props.customer.id,
                    vendor: props.vendor.id,
                    snacks: submitOrder
                }).then(response => {
                    if (response.data.success) {
                        message.success("Your order has been placed")
                        setModalVisible(false)
                    } else {
                        message.error("an error occurs when placing orders")
                    }
                })
            }
        }
    }

    return (
        <div>
            <Marker key={props.id} position={props.position} icon={vendorIcon}
                eventHandlers={{ click: handleModalShow }}></Marker>

            <Modal show={modalVisible} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Menu({props.vendor.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.snacks.map((snack, index) => (
                        <Card cover={<img alt="example" src={snack.img} />} style={{ marginBottom: "2vh" }} size={'small'} key={snack._id}>
                            <Meta title={snack.name + "  $" + snack.price} />
                            <InputNumber key={snack._id} min={0} defaultValue={0} style={{ marginLeft: "80%" }} onChange={e => onChange(index, e)} />
                        </Card>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={onSubmit}>
                        Submit Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )


}