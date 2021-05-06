import {useState, useEffect} from 'react';
import {Jumbotron, Button, OverlayTrigger, Tooltip, Modal, Form, FormControl, Image} from 'react-bootstrap';
import {message, Typography} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';

const {Link} = Typography;

function App(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

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
    <Tooltip id="button-tooltip" {...props}> start your foodie journey here </Tooltip>
  )


  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}> under construction, feature opening soon </Tooltip>
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

    <Jumbotron style={{width: '30%', backgroundColor: 'white', margin: 'auto', marginTop:'5%'}}>

      <Image src="logo1.jpg/171x180" />

      <h3>Customer Login</h3>


      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Please enter your email"
          onChange={e => setEmail(e.target.value)}/>
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
      <Link onClick={findPassword}>Forget Password?</Link>
      <p></p>
      <Link onClick={onSkip}>Skip</Link>

    </Jumbotron>

    

  );
}

export default App;
