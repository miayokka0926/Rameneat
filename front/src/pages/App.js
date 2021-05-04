import {useState, useEffect} from 'react';
import {Jumbotron, Button, OverlayTrigger, Tooltip, Modal, Form, FormControl} from 'react-bootstrap';
import {message, Typography} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';

const {Link} = Typography;

function App(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[email, setEmail] = useState('');
  const[password,setPassword] = useState('');

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    })
    axios.get('/vendor?lat='+lat+'&lng='+lng).then(response => {
      setVendors(response.data.vendors)
    })
  },[lat,lng])


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}> feature to be implemented </Tooltip>
  )

  const onLogin = () => {
    axios.post('/customer/login', {email: email, password:password}).then(response=>{
      if (response.data.success){
        props.history.push('/customer', {
          customer: response.data.customer,
          vendors: vendors,
          position: [lat, lng]
        })
      }else {
        message.error(response.data.error)
      }
    }).catch(error =>{
      setShow(false);
      console.log(error.response.data.message)
      message.error(error.response.data.message)
    })
  }

  const onSkip = () => {
    props.history.push('/customer', {
      position: [lat, lng],
      vendors: vendors
    })
  }

  return (
    <div style={{width: '40%', margin: 'auto',marginTop:'20%'}}>
      <Modal show = {show} onHide={handleClose} style={{marginTop:'2vh'}}>
        <Modal.Header closeButton>
          <Modal.Title>Hi, please log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Please enter your email"
              onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                Your email is secured with us.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password"
              onChange = {e=>setPassword(e.target.value)} />
            </Form.Group>
          </Form>
          <Link onClick={onSkip}>Skip</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={onLogin}>Login</Button>
        </Modal.Footer>
        </Modal>
        <Jumbotron style={{background: 'white'}}>
          <h1>Welcome to Ramen Eat!</h1>
          <p>Choose one option to continue</p>
          <p><Button variant="primary" onClick={handleShow}>Customer</Button>
          <OverlayTrigger placement="right" delay={{show:250, hide:400}} overlay={renderTooltip}>
            <Button variant="outline-primary" style={{marginLeft: "1vw"}}>Vendor</Button>
          </OverlayTrigger>
          </p>
        </Jumbotron>
    </div>
  );
}

export default App;
