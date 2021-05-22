import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Card, Modal, notification,Rate, Divider, Input, Badge } from "antd";
import { badge, EyeOutlined, EditOutlined } from "@ant-design/icons";
import TimeCountUp from '../components/TimeCountUp';

const { Meta } = Card;

const desc = ['wonderful', 'good', 'normal', 'bad', 'terrible'];
const {TextArea } = Input;

// list order details
export default function OrderBrief(props) {
  const snacks = props.order.snacks.map((snack, index) => (
    
    <li key={snack.name}>
      <h5>
        {snack.name} qty:{snack.qty} 
      </h5>
    </li>
  ));
  const [modalVisible, setModalVisible] = useState(false);
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const handleClose = () => setModalVisible(false);
  const handleShow = () => setModalVisible(true);
  const handleEditClose = () => setEditModalVisible(false);
  const handleEditShow = () => setEditModalVisible(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {" "}
      still in progress
    </Tooltip>
  );
  const onEdit = () => {
    let now = new Date()
    let upd  = Date.parse(props.order.updatedAt)
    let mins = parseInt((now - upd) / 60000)
    //console.log(mins)

    if (props.order.status === "outstanding" && mins <= 10){
      setEditModalVisible(true);
    }
    if(props.order.status === "fulfilled" ){
      notification.open({
        message: "order is ready for pick up",
        description: "please rate your order afterwards", 
        duration: 2
      });

    }else if(props.order.status === "outstanding" && mins > 10){
      notification.open({
        message: "your order is being processed",
        description: "order placed more than 10 mins, cannot change",
        duration: 2
      });
    }else{
      console.log(props.order)
      setEditModalVisible(true);
    }
  }

  const renderEditModalBody = () => {
    return(
      <p style={{ fontSize: 30, color: "#F4976C" }}>
          {" "}
          Vendor: {props.order.vendor.name}
      </p>

    )
  }

  //update order status
  /*const onOrderMark = () => {
    if (props.order.status === 'outstanding'){
      axios.post('/order/' + props.order._id + '/update', {
        status: 'outstanding', 
        snacks: submitOrder
      }.then()
    }

  }*/

  // The UI design of order detail.
  return (

    

    <div>

      <Modal
        style={{ backgroundColor: "orange" }}
        visible={modalVisible}
        title={"Order updated at " + props.order.updatedAt}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <p style={{ fontSize: 30, color: "#F4976C" }}>
          {" "}
          Vendor: {props.order.vendor.name}
        </p>
        <p>{snacks}</p>
        
      </Modal>
        
        {/*<Divider></Divider>
        <p>comment and rating</p>
        <p>rating:</p><Rate Tooltips = {desc} onChange={(e) => this.ratingChange(e)} />
        <Divider></Divider>
        <TextArea rows = {4} onChange={(e) => this.commentChange(e.target.value)} />
        {this.state.rating ? <span className="ant-read-text">{desc[this.state.rating-1]}</span> :''}*/}
      


      <Card
        style={{ backgroundColor: "#F4976C", margin: "14px" }}
        actions={[
          <EyeOutlined onClick={handleShow} />,
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 260, hide: 400 }}
            overlay={renderTooltip}
          >
            <EditOutlined />
          </OverlayTrigger>,
        ]}
      >
        <Meta title={props.order.vendor.name} />
        <Meta title={" status:  " + props.order.status} />
        <Meta title={snacks} />
        <TimeCountUp updatedAt={props.order.updatedAt} />

      </Card>

      </div>
  );
}
