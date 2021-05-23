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
  const handleModalClose = () => setModalVisible(false);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState('');

  const [submitOrder, setSubmitOrder] = useState([]);

  const addItem = (index, event) => {
    let newOrder = [...order];
    let value = newOrder[index];
    if (value === undefined) {
      newOrder[index] = 1;
    } else {
      newOrder[index]++;
    }
    setOrder(newOrder);
  };

  //decrease the item number
  const subtractItem = (index, event) => {
    let newOrder = [...order];
    if (newOrder[index] > 0) {
      newOrder[index]--;
    }
    setOrder(newOrder);
  };

  let history = useHistory();
  //place and submit an order
  const onSubmit = () => {
    if (!props.customer) {
      message.error("you need to log in to place an order");
      history.goBack();
    } else {
      var submitOrder = [];
      for (var i = 0; i < order.length; i++) {
        if (Number.isFinite(order[i]) && order[i] > 0) {
          submitOrder.push({
            name: props.snacks[i].name,
            qty: order[i],
          });
        }
      }
      console.log(submitOrder);
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
  };
  //render the outcome
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
                  onClick={(e) => addItem(index, e)}
                  style={{ backgroundColor: "orange", marginRight: "1vw" }}
                >
                  +
                </Button>
                <InputNumber
                  key={snack._id}
                  min={0}
                  defaultValue={0}
                  value={order[index]}
                />
                <Button
                  onClick={(e) => subtractItem(index, e)}
                  style={{ backgroundColor: "orange", marginLeft: "1vw" }}
                >
                  -
                </Button>
              </Row>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "right" }}>

          {/* <Button
          style={{ backgroundColor: "orange", marginLeft: "36%" }}
          variant="primary"
          onClick={() => setOpen(open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}>
            Confirm order
          </Button>

          <Collapse in={open}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        

          <Button
            style={{ backgroundColor: "orange", marginLeft: "36%" }}
            variant="primary"
            onClick={onSubmit}
          >
            Submit Order
          </Button>
          </div>

          </Collapse> */}


       
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  //update an item of the menu
//   const addItem = (index, event) => {
//     let newOrder = [...order];
//     let value = newOrder[index];
//     if (value === undefined) {
//       newOrder[index] = 1;
//     } else {
//       newOrder[index]++;
//     }
//     setOrder(newOrder);
//     console.log(newOrder);
//   };

//   //decrease the item number
//   const subtractItem = (index, event) => {
//     let newOrder = [...order];
//     if (newOrder[index] > 0) {
//       newOrder[index]--;
//     }
//     setOrder(newOrder);
//   };

//   let history = useHistory();



//   //place and submit an order
  
//   const onSubmit = () => {
//     if (!props.customer) {
//       message.error("you need to log in to place an order");
//       history.goBack();
//     } else {
//       var submitOrder = [];
//       for (var i = 0; i < order.length; i++) {
//         if (Number.isFinite(order[i]) && order[i] > 0) {
//           submitOrder.push({
//             name: props.snacks[i].name,
//             qty: order[i],
//             //total: order[i].price,
//           });
//         }
//       }
//       console.log(submitOrder);
//       //set up error cases
//       if (submitOrder.length === 0) {
//         setModalVisible(false);
//         message.error("You must enter at least one snack!");
//       } else {
//         setSubmitOrder(submitOrder);
//         axios
//           .post("/order/create", {
//             customer: props.customer.id,
//             vendor: props.vendor.id,
//             snacks: submitOrder,
//             //total: total,
//           })
//           .then((response) => {
//             if (response.data.success) {
//               message.success("Your order has been placed");
//               setModalVisible(false);
//             } else {
//               message.error("an error occurs when placing orders");
//             }
//           });
//       }
//     }
//   };

//   const onConfirm = () => {
//     if (!props.customer) {
//       message.error("you need to log in to place an order");
//       history.goBack();
//     } else {
      
//       for (var i = 0; i < order.length; i++) {
//         if (Number.isFinite(order[i]) && order[i] > 0) {
//           submitOrder.push({
//             name: props.snacks[i].name,
//             qty: order[i],
//           });
//           setSubmitOrder(submitOrder)
//         }
//       }
      
//       //set up error cases
//       if (submitOrder.length === 0) {
//         setModalVisible(false);
//         message.error("You must enter at least one snack!");
//       }     

//     }  
    
//   }

//   console.log(submitOrder)
  
//   //render the outcome
//   return (
//     <div>
//       <Marker
//         key={props.id}
//         position={props.position}
//         icon={vendorIcon}
//         eventHandlers={{ click: handleModalShow }}
//       ></Marker>

//       <Modal show={modalVisible} onHide={handleModalClose}>
//         <Modal.Header
//           closeButton
//           style={{ color: "orange", display: "flex", justifyContent: "right" }}
//         >
//           <Modal.Title style={{ marginLeft: "36%" }}>
//             Menu ({props.vendor.name})
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {props.snacks.map((snack, index) => (
//             <Card
//               cover={<img alt="example" src={snack.img} />}
//               style={{ marginBottom: "3vh" }}
//               key={snack._id}
//             >
//               <Meta
//                 title={snack.name + "  $" + snack.price}
//                 style={{
//                   marginLeft: "35%",
//                   marginBottom: "2vh",
//                   fontStyle: "italic",
//                 }}
//               />
//               <Row gutter={6} style={{ marginLeft: "27%" }}>
//                 <Button
//                   onClick={(e) => subtractItem(index, e)}
//                   style={{ backgroundColor: "orange", marginRight: "1vw" }}
//                 >
//                   -
//                 </Button>
//                 <InputNumber
//                   key={snack._id}
//                   min={0}
//                   defaultValue={0}
//                   value={order[index]}
//                 />
//                 <Button
//                   onClick={(e) => addItem(index, e)}
//                   style={{ backgroundColor: "orange", marginLeft: "1vw" }}
//                 >
//                   +
//                 </Button>
//               </Row>
//             </Card>
//           ))}
//         </Modal.Body>
//         <Modal.Footer style={{ display: "flex", justifyContent: "right" }}>


//           <Button
//           style={{ backgroundColor: "orange", marginLeft: "36%" }}
//           onClick={() => setOpen(!open)}
//           aria-controls="example-collapse-text"
//           aria-expanded={open}
//         >
//           Confirm order
//          </Button>

//         <Collapse in={open}>
//           <div id="example-collapse-text">
            
//             <p>item: {submitOrder.name}</p>
//             <p>qty: {submitOrder.qty}</p>
            

//             <Button 
//             style={{ backgroundColor: "orange", marginLeft: "36%" }}
//             onClick={onSubmit}>
//               submit
//             </Button>

//           </div>
  
//         </Collapse>
        
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }