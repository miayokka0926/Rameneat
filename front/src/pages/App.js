import {useState, useEffect} from 'react';
import {Jumbotron, Button, OverlayTrigger, Tooltip, Modal, Form, FormControl} from 'react-bootstrap';
import {message, Typography} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import image from '../logo.png';
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
      console.log(response)
      setVendors(response.data.vendors)
    })
  },[lat,lng])


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}> feature opening soon </Tooltip>
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
        setShow(false);
      }
    }).catch(error =>{
      
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

  const findPassword = (props) => {
    <Tooltip id="button-tooltip" {...props}> feature opening soon </Tooltip>
  }

  return (
    <div style={{width: '60%', margin: 'auto',marginTop:'7%'}}>
      <Modal show = {show} onHide={handleClose} style={{marginTop:'2vh'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'orange'}}>Hi, please log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Please enter your email"
              onChange={e => setEmail(e.target.value)} />

            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password"
              onChange = {e=>setPassword(e.target.value)} />
            </Form.Group>
          </Form>
          <OverlayTrigger placement="right" delay={{show:250, hide:400}} overlay={renderTooltip}>
          <Link onClick={findPassword}>Forget Password?</Link>
          </OverlayTrigger>
          <p></p>
          <Link onClick={onSkip}>Skip</Link>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="secondary" size="lg" block style={{width: '25vw',color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6'}}>Cancel</Button>
          <Button variant="primary" onClick={onLogin} size="lg" block style={{width: '25vw',color: '#FBE8A6', backgroundColor: '#F4976C', borderColor: '#F4976C'}}>Login</Button>
        </Modal.Footer>
        </Modal>
        <Jumbotron style={{width: '30%', backgroundColor: 'white', margin: 'auto', marginLeft:"15%", marginTop:'1%'}}>
        <center>
        <img src={image} style={{width: '35vw', margin: 'auto'}} alt="logo"/>
        </center >
        
          <h1 style={{color:"orange"}}>Welcome to Ramen Eat!</h1>
          <br />
          <h6 style={{color: '#707070', opacity: '80%'}}>I'm a ...</h6>
          <p>
            <Button variant="primary" onClick={handleShow} size="lg" block style={{width: '25w', color: '#FBE8A6', backgroundColor: '#F4976C', borderColor: '#F4976C'}}>Customer</Button>
          <br />
          <OverlayTrigger placement="right" delay={{show:250, hide:400}} overlay={renderTooltip}>
            <Button variant="primary" size="lg" block style={{width: '25vw',color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6'}}>Vendor</Button>
          </OverlayTrigger>
          </p>
        </Jumbotron>
    </div>
  );
}

export default App;
