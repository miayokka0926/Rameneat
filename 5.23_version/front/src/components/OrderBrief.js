import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Badge, InputNumber, Card, notification, message, Rate, Divider, Input, Row } from "antd";
import { EyeOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { Modal, Button } from "react-bootstrap";
import TimeCountUp from '../components/TimeCountUp';
import axios from "../commons/axios.js";


const { Meta } = Card;
const desc = ['very bad', 'bad', 'normal', 'good', 'very good'];
const { TextArea } = Input;

export default class OrderBrief extends React.Component {

  constructor(props) {
    super();
    this.state = {
      menu: [],
      order: [],
      modalVisible: false,
      editModalVisible: false,
      modalBody: <></>,
      diff: "",
      ratings: 0,
      comment: ""
    }
  }

  handleClose = () => this.setState({ modalVisible: false });
  handleShow = () => this.setState({ modalVisible: true });

  handleEditClose = () => this.setState({ editModalVisible: false });
  handleEditShow = () => this.setState({ editModalVisible: true });



  //update an item of the menu
  addItem = (index, event) => {
    let newOrder = [...this.state.order];
    let value = newOrder[index];
    if (value === undefined) {
      newOrder[index] = 1;
    } else {
      newOrder[index]++;
    }
    this.setState({ order: newOrder });
  };

  //decrease the item number
  subtractItem = (index, event) => {
    let newOrder = [...this.state.order];
    if (newOrder[index] > 0) {
      newOrder[index]--;
    }
    this.setState({ order: newOrder });
  };

  onOrderMark = () => {
    var statusToBeUpdated, discount;
    var total = this.props.order.total;
    if (this.props.order.status === "outstanding") {
      statusToBeUpdated = "fulfilled"
      if (this.state.diff > 15) {
        discount = true;
        total = total * 0.8
      } else {
        discount = false;
      }
      axios
        .post("/order/" + this.props.order._id + "/update", {
          total: total,
          discount: discount,
          status: statusToBeUpdated
        })
        .then((response) => {
          if (response.data.success) {
            message.success("Your order has been updated");
            this.setState({ editModalVisible: false });
          } else {
            message.error("an error occurs when updating orders");
          }
        });
    } else if (this.props.order.status === "fulfilled") {
      statusToBeUpdated = "completed"
      axios
        .post("/order/" + this.props.order._id + "/update", {
          status: statusToBeUpdated
        })
        .then((response) => {
          if (response.data.success) {
            message.success("Your order has been updated");
            this.setState({ editModalVisible: false });
          } else {
            message.error("an error occurs when updating orders");
          }
        });
    } else {
      notification.open({
        message: "Order is already completed!",
        description: "The order is already completed",
        duration: 3
      });
    }
  }

  //place and submit an order
  onOrderSubmit = () => {
    var submitOrder = [];
    for (var i = 0; i < this.state.order.length; i++) {
      if (Number.isFinite(this.state.order[i]) && this.state.order[i] > 0) {
        submitOrder.push({
          "name": this.state.menu[i].name,
          "qty": this.state.order[i],
        });
      }
    }

    //set up error cases
    if (submitOrder.length === 0) {
      this.setState({ editModalVisible: false });
      message.error("You must enter at least one snack!");
    } else {
      axios
        .post("/order/" + this.props.order._id + "/update", {
          snacks: submitOrder,
          status: "outstanding",
        })
        .then((response) => {
          if (response.data.success) {
            message.success("Your order has been placed");
            this.setState({ editModalVisible: false });
          } else {
            message.error("an error occurs when placing orders");
          }
        })
    }
  }


  onCommentSubmit = () => {
    axios
      .post("/order/" + this.props.order._id + "/update", {
        comment: this.state.comment,
        ratings: this.state.ratings,
      })
      .then((response) => {
        if (response.data.success) {
          message.success("Your order has been commented");
          this.setState({ editModalVisible: false });
        } else {
          message.error("an error occurs when rating orders");
        }
      })
  }

  tick() {
    let now = new Date().getTime()
    let upd = Date.parse(this.props.order.updatedAt)
    this.setState({ diff: ((now - upd) / 60000) })
  }

  componentDidMount() {
    axios.get('/snack').then(response => {
      this.setState({ menu: response.data.snacks })
    })
    this.timerID = setInterval(() => this.tick(), 1000); // updates this DOM every second
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // tears down timer so that interval starts over
  }

  handleShowOrderDetail = () => {
    console.log(this.props.order)
  }

  ratingsChange = (value) => {
    console.log(value)
    this.setState({ ratings: value });
  }

  commentChange = (value) => {
    this.setState({ comment: value });
  }

  handleEditOrder = () => {
    console.log(this.state.diff)
    if (this.props.order.status === "outstanding" && this.state.diff <= 10) {
      this.setState({ editModalVisible: true });
    }
    if (this.props.order.status === "fulfilled") {
      notification.open({
        message: "Order is ready for pickup",
        description: "No further change is allowed for fulfilled orders! You can rate your experience.",
        duration: 3
      });
    } else if (this.props.order.status === "outstanding" && this.state.diff > 10) {
      notification.open({
        message: "Order is being processed",
        description: "Changes allowed only within 10 minutes of placing the order!",
        duration: 3
      });
    } else {
      console.log(this.props.order)
      this.setState({ editModalVisible: true });
    }
  }

  renderTooltip = (props) => {
    if (this.props.order.status === "outstanding") {
      return (<Tooltip id="button-tooltip" {...this.props}> Edit your order </Tooltip>)
    } else if (this.props.order.status === "fulfilled") {
      return (<Tooltip id="button-tooltip" {...this.props}> Can be picked up </Tooltip>)
    } else if (this.props.order.status === "completed" && window.location.pathname === '/customer') {
      return (<Tooltip id="button-tooltip" {...this.props}> Rate your experience </Tooltip>)
    } else {
      return (<Tooltip id="button-tooltip" {...this.props}> Order finished </Tooltip>)
    }
  }

  renderDetailTooltip = (props) => {
    return (<Tooltip id="button-tooltip" {...this.props}> View order detail </Tooltip>)
  }

  renderActions = () => {
    if (window.location.pathname === '/customer') {
      return (
        [
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 260, hide: 400 }}
            overlay={this.renderDetailTooltip()}
          >
            <EyeOutlined onClick={() => this.handleShow()} />
          </OverlayTrigger>,

          <OverlayTrigger
            placement="bottom"
            delay={{ show: 260, hide: 400 }}
            overlay={this.renderTooltip()}
          >
            <EditOutlined onClick={() => this.handleEditOrder()} />
          </OverlayTrigger>
        ]
      )
    } else if (window.location.pathname === '/orders') {
      return (
        [
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 260, hide: 400 }}
            overlay={this.renderDetailTooltip()}
          >
            <EyeOutlined onClick={() => this.handleShow()} />
          </OverlayTrigger>,

          <OverlayTrigger
            placement="bottom"
            delay={{ show: 260, hide: 400 }}
            overlay={this.renderTooltip()}
          >
            <CheckOutlined onClick={() => this.onOrderMark()} />
          </OverlayTrigger>
        ]
      )
    }
  }

  renderEditModalContent = () => {
    if (this.props.order.status === "outstanding") {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Edit your order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.menu.map((snack, index) => (
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
                    onClick={(e) => this.subtractItem(index, e)}
                    style={{ backgroundColor: "orange", marginRight: "1vw" }}
                  >
                    -
                </Button>
                  <InputNumber
                    key={snack._id}
                    min={0}
                    defaultValue={0}
                    value={this.state.order[index]}
                  />
                  <Button
                    onClick={(e) => this.addItem(index, e)}
                    style={{ backgroundColor: "orange", marginLeft: "1vw" }}
                  >
                    +
                </Button>
                </Row>
              </Card>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button style={{ backgroundColor: "orange", marginLeft: "36%" }}
              variant="primary"
              onClick={() => this.onOrderSubmit()}>
              Submit Order
            </Button>
          </Modal.Footer>
        </>
      )
    } else {
      return (
        <>
          {/* NEED UI CHANGE */}
          <Modal.Header closeButton>
            <Modal.Title>{"OrderId: " + this.props.order._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Vendor: {this.props.order.vendor.name}</p>
            <p>Snacks: {this.props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} x {snack.qty}</li>)}</p>
            <Divider>Rate your experience with us</Divider>
            <p>Ratings:</p><Rate tooltips={desc} onChange={(e) => this.ratingsChange(e)} />
            {this.state.ratings ? <span className="ant-rate-text">{desc[this.state.ratings - 1]}</span> : ''}
            <Divider></Divider>
            <p>Comment</p><TextArea rows={4} onChange={(e) => this.commentChange(e.target.value)} />

          </Modal.Body>
          <Modal.Footer>
            决定是否可以更新多次
            <Button variant="primary" onClick={() => this.onCommentSubmit()}>
              Submit
            </Button>
          </Modal.Footer>
        </>
      )
    }
  }



  render() {
    return (
      <>
        {/* order detail */}
        <Modal
          show={this.state.modalVisible}
          onHide={() => this.handleClose()}
        >
          <Modal.Header closeButton style={{ backgroundColor: "#F4976C" }}>
            <Modal.Title>{"Order updated at " + this.props.order.updatedAt}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: 30, color: "#F4976C" }}>
              {" "}
              Vendor: {this.props.order.vendor.name}
            </p>
            <p>{this.props.order.snacks.map((snack) =>
              <li key={snack.name} style={{ fontSize: 20 }}>
                {snack.name} x {snack.qty}
              </li>)}
            </p>
            {(this.props.order.discount) ? <p>Total: {this.props.order.total * 1.25} * 0.8 = {this.props.order.total}</p> : <p>Total: {this.props.order.total}</p>}
            {(this.props.order.ratings) ? <><p>Ratings: </p><Rate disabled value={this.props.order.ratings} /></> : <></>}
            {(this.props.order.comment) ? <><p>Comment: </p><>{this.props.order.comment}</></> : <></>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style={{ backgroundColor: '#F4976C', borderColor: '#F4976C' }} onClick={() => this.handleClose()}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>

        {/* edit order */}
        <Modal
          show={this.state.editModalVisible}
          onHide={() => this.handleEditClose()}>
          {this.renderEditModalContent()}
        </Modal>

        {/* each order brief */}

        {this.props.order.discount ?
          <Badge.Ribbon text="20% OFF BADGE 颜色需修改 " >
            <Card style={{ backgroundColor: "#F4976C", margin: "14px" }}
              actions={this.renderActions()} >
              <Meta title={"Vendor: " + this.props.order.vendor.name} />
              <Meta title={"Status: " + this.props.order.status} />
              <Meta title={"Snacks: "} />
              <Meta title={this.props.order.snacks.map((snack) => 
                <li key={snack.name}>{snack.name} x {snack.qty}</li>)} />
              <Meta title={"Price: $" + this.props.order.total} />
              <Meta title={(this.props.order.discount) ? <p>Total: {this.props.order.total * 1.25} * 0.8 = {this.props.order.total}</p> : <p>Total: {this.props.order.total}</p>}/>
              {/* {(this.props.order.discount) ? <p>Total: {this.props.order.total * 1.25} * 0.8 = {this.props.order.total}</p> : <p>Total: {this.props.order.total}</p>} */}
              {(this.props.order.status === "fulfilled") ? "order is fulfilled"
                : (this.props.order.status === "completed") ? "order is completed"
                  : <TimeCountUp updatedAt={this.props.order.updatedAt} />}
            </Card>
          </Badge.Ribbon>
          : <Card style={{ backgroundColor: "#F4976C", margin: "14px" }}
            actions={this.renderActions()} >
              <Meta title={"Vendor: " + this.props.order.vendor.name} />
              <Meta title={"Status: " + this.props.order.status} />
              <Meta title={"Snacks: "} />
              <Meta title={this.props.order.snacks.map((snack) => 
                <li key={snack.name}>{snack.name} x {snack.qty}</li>)} />
              <Meta title={"Price: $" + this.props.order.total} />
              <Meta title={(this.props.order.discount) ? <p>Total: {this.props.order.total * 1.25} * 0.8 = {this.props.order.total}</p> : <p>Total: {this.props.order.total}</p>}/>
              {/* {(this.props.order.discount) ? <p>Total: {this.props.order.total * 1.25} * 0.8 = {this.props.order.total}</p> : <p>Total: {this.props.order.total}</p>} */}
              {(this.props.order.status === "fulfilled") ? "order is fulfilled"
                : (this.props.order.status === "completed") ? "order is completed"
                  : <TimeCountUp updatedAt={this.props.order.updatedAt} />}
            </Card>}
      </>
    )
  }
}