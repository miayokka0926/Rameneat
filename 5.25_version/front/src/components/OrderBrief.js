// This script is for each specific order that made by a customer.
import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Card, Modal } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import TimeCountUp from '../components/TimeCountUp';

const { Meta } = Card;

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
  const handleClose = () => setModalVisible(false);
  const handleShow = () => setModalVisible(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {" "}
      Cannot change order!
    </Tooltip>
  );
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