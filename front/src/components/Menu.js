// display menu when clicking on each vendor icon.
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, message, InputNumber, Row } from "antd";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { Modal, Button } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import axios from "../commons/axios";
import image from "../components/logo.png";

//Display vendor icon on the map. Once clicking on the icon, the menu will be rendered.
const { Meta } = Card;
export default function Menu(props) {
  const vendorIcon = new Icon({
    iconUrl: image,
    iconSize: [66, 66],
  });
  //set up variables for components and function
  const [order, setOrder] = useState([]);
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const handleModalShow = () => setModalVisible(true);
  const handleModalClose = () => {setModalVisible(false); setOrder([])};
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState('');
  const [submitOrder, setSubmitOrder] = useState([]);

  // once + is clicked 
  const addItem = (index, event) => {
    let newOrder = [...order];
    let value = newOrder[index];
    if (value === undefined) {
      newOrder[index] = 1;
    } else {
      newOrder[index]++;
    }
    setOrder(newOrder);
    console.log(newOrder);

    var submitOrder = [];
    var total  = 0;
    for (var i = 0; i < newOrder.length; i++) {
      
      if (Number.isFinite(newOrder[i]) && newOrder[i] > 0) {
        submitOrder.push({
          name: props.snacks[i].name,
          qty: newOrder[i],
          price: props.snacks[i].price,
        });
        total += props.snacks[i].price * newOrder[i];
      }
    }
    setSubmitOrder(submitOrder);
    setTotal(total);
    
    console.log(total);



  };

  //once - is clicked
  const subtractItem = (index, event) => {
    let newOrder = [...order];
    if (newOrder[index] > 0) {
      newOrder[index]--;
    }
    setOrder(newOrder);

    var submitOrder = [];
    var total = 0;
    for (var i = 0; i < newOrder.length; i++) {
      
      if (Number.isFinite(newOrder[i]) && newOrder[i] > 0) {
        submitOrder.push({
          name: props.snacks[i].name,
          qty: newOrder[i],
          price: props.snacks[i].price,
        });

        total += props.snacks[i].price * newOrder[i];
        
    
      }
    }
    setSubmitOrder(submitOrder);
    setTotal(total);
    console.log(total);
    

  };

  let history = useHistory();

  //place and submit an order
  const onSubmit = () => {
    if (!props.customer) {
       message.error("you need to log in to place an order");
      history.goBack();
    } else {
      var submitOrder = [];
      var total = 0;
      for (var i = 0; i < order.length; i++) {
        if (Number.isFinite(order[i]) && order[i] > 0) {
          submitOrder.push({
            name: props.snacks[i].name,
            qty: order[i],
          });
         total += props.snacks[i].price * order[i];
          
        }
      }

      //set up error cases
      if (submitOrder.length === 0) {
        setModalVisible(false);
        message.error("You must enter at least one snack!");
      } else {
        axios
          .post("/order/create", {
            customer: props.customer.id,
            vendor: props.vendor.id,
            snacks: submitOrder,
            total: total,
          })
          .then((response) => {
            if (response.data.success) {
              message.success("Your order has been placed");
              setModalVisible(false);
            } else {
              message.error("an error occurs when placing orders");
            }
          });
      }
    }

    submitOrder = [];
    setSubmitOrder(submitOrder);
    
    total = 0;
    setTotal(total);

    setOpen(!open);
    

    setOrder([]);



    
  };

  const snacks = submitOrder.map((snack, index) => (
    <li key={snack.name} style={{ fontSize: 20}} >
        {snack.name} ${snack.price} x {snack.qty} 
    </li>
  ));

  return (
    <div>
      <Marker
        key={props.id}
        position={props.position}
        icon={vendorIcon}
        eventHandlers={{ click: handleModalShow }}
      ></Marker>

      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header
          closeButton
          style={{ color: "orange", display: "flex", justifyContent: "right" }}
        >
          <Modal.Title style={{ marginLeft: "36%" }}>
            Menu ({props.vendor.name})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.snacks.map((snack, index) => (
            <Card
              cover={<img alt="example" src={snack.img} />}
              style={{ marginBottom: "3vh" }}
              key={snack._id}
            >
              <Meta
                title={snack.name + "  $" + snack.price}
                style={{
                  marginLeft: "35%",
                  marginBottom: "2vh",
                  fontStyle: "italic",
                }}
              />
              <Row gutter={6} style={{ marginLeft: "27%" }}>
                <Button
                  onClick={(e) => subtractItem(index, e)}
                  style={{ backgroundColor: "orange", marginRight: "1vw" }}
                >
                  -
                </Button>
                <InputNumber
                  key={snack._id}
                  min={0}
                  defaultValue={0}
                  value={order[index]}
                />
                <Button
                  onClick={(e) => addItem(index, e)}
                  style={{ backgroundColor: "orange", marginLeft: "1vw" }}
                >
                  +
                </Button>
              </Row>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "right" }}>
          

          <Button 
          style={{ backgroundColor: "orange", marginLeft: "36%" }}
          variant="primary"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}>
            Confirm order
          </Button>

          <Collapse in={open}>
            
        
          <p> 
            <h5>Your order: {snacks} </h5>
            <h5>Ordered from: {props.vendor.name}</h5>
            <h5>Total price: $ {total}    </h5>
            
              
            <h6>Change your mind? you can always scroll up and change your order! </h6>
              

              <Button
              style={{ backgroundColor: "orange", marginLeft: "36%" }}
              variant="primary"
              onClick={onSubmit}
            >
              Submit Order
              </Button> 
          </p>       
        
          </Collapse>    
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  