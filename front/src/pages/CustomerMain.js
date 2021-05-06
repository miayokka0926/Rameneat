
import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Divider, Drawer, PageHeader} from 'antd';
import axios from '../commons/axios';

import OrderList from '../components/OrderList.js';
import LeafletMap from '../components/LeafletMap.js';


function CustomerMain(props){
    const [drawerVisible, setDrawerVisible] = useState(false);
    const handleDrawerClose=()=>setDrawerVisible(false);
    const handleDrawerShow=()=>setDrawerVisible(true);
    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        if (props.location.state.customer) {
            console.log(props.location.state.position)
            console.log(props.location.state.vendors)
            axios.get('/order?customer=' +props.location.state.customer.id).then(response =>{
                console.log(response)
                setOrders(response.data.allOrders)
            })
            setTitle("Welcome back, "+ props.location.state.customer.name)
            setOptions([<Button variant="outline-primary" key="1" onClick={handleDrawerShow}>view Orders</Button>])
        } else {
            setTitle("Welcome!")
        }
        axios.get('/snack').then(response =>{
            setSnacks(response.data.snacks)
        })
    },[props.location.state.position, props.location.state.vendors, props.location.state.customer])
    return(
        <div>
            <PageHeader title = {title}
            extra = {options}></PageHeader>
            <Drawer visible = {drawerVisible} closable={true} onClose={handleDrawerClose} width = {"40vw"}>
                My orders
                <Divider />
                <OrderList orders = {orders} />
            </Drawer>
            <LeafletMap center = {props.location.state.position} vendors={props.location.state.vendors}
                snacks={snacks} customer={props.location.state.customer} />
        </div>

    )
}

export default CustomerMain;