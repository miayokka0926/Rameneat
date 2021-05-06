import "antd/dist/antd.css";
import React, {useState} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Card, Modal} from 'antd';
import {EyeOutlined, EditOutlined} from '@ant-design/icons';

const {Meta} = Card;

export default function OrderBrief(props) {
    const snacks = props.order.snacks.map((snack)=> <li key= {snack.name}>{snack.name}-qty:{snack.qty}</li>);
    const [modalVisible, setModalVisible]=useState(false);
    const handleClose =() => setModalVisible(false);
    const handleShow =() => setModalVisible(true);

    const renderTooltip = (props) =>(
        <Tooltip id="button-tooltip" {...props}> still in progress</Tooltip>
    )
    console.log(props.order)
    return (
        <div>
            <Modal visible={modalVisible} title={"OrderId "+ props.order._id}
            onOk={handleClose} onCancel={handleClose}>
                <p> Vendor: {props.order.vendor.name}</p>
                <p>{snacks}</p>
            </Modal>

            <Card style={{margin: "10px"}}
                actions={[<EyeOutlined onClick={handleShow} />,
                     <OverlayTrigger placement="bottom" delay={{show:250, hide: 400}} overlay={renderTooltip}>
                         <EditOutlined/>
                     </OverlayTrigger>]}>
                         <Meta title = {props.order.vendor.name + " - "+props.order.status} />
                     </Card>
                     
        </div>
    )
}