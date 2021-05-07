import React, { useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Card, Modal } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function OrderBrief(props) {
    const snacks = props.order.snacks.map((snack, index) => <li key={snack.name}><h5>{snack.name}  qty:{snack.qty}</h5></li>);
    const [modalVisible, setModalVisible] = useState(false);
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}> still in progress</Tooltip>
    )

    return (
        <div>
            <Modal style={{ backgroundColor: "orange" }} visible={modalVisible} title={"Order Updated at " + props.order.updatedAt}
                onOk={handleClose} onCancel={handleClose}>
                <p style={{ fontSize: 30, color: "#F4976C" }}> Vendor: {props.order.vendor.name}</p>
                <p>{snacks}</p>
            </Modal>
            <Card style={{ backgroundColor: "#F4976C", margin: "14px" }}
                actions={[<EyeOutlined onClick={handleShow} />,
                <OverlayTrigger placement="bottom" delay={{ show: 260, hide: 400 }} overlay={renderTooltip}>
                    <EditOutlined />
                </OverlayTrigger>]}>
                <Meta title={props.order.vendor.name} />
                <br />
                <Meta title={" status:  " + props.order.status} />
            </Card>

        </div>
    )
}