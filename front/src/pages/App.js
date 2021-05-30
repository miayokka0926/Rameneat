// main log in page of the website
import { useState, useEffect } from 'react';
import { Jumbotron, Button, OverlayTrigger, Tooltip, Form, FormControl } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { message, Typography } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from '../commons/axios.js';
import image from '../pic/logo1.jpg';
const { Link } = Typography;


function App(props) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState('');

  const [customerOpen, setCustomerOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // get customer location once they get access to our website.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    })
    axios.get('/vendor?lat=' + lat + '&lng=' + lng).then(response => {
      console.log(response)
      setVendors(response.data.vendors)
    })
  }, [lat, lng])


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}> start your business </Tooltip>
  )

  const renderTooltipCustomer = (props) => (
    <Tooltip id="button-tooltip" {...props}> start your tasty journey</Tooltip>
  )
  // ask customer to fillin their email and password once they click on login button.
  const onCustomerLogin = () => {
    axios.post('/customer/login', { email: email, password: password }).then(response => {
      if (response.data.success) {
        props.history.push('/customer', {
          customer: response.data.customer,
          vendors: vendors,
          position: [lat, lng]
        })
      } else {
        message.error(response.data.error)

      }
    }).catch(error => {

      console.log(error.response.data.message)
      message.error(error.response.data.message)
    })
  }
  // ask vendor to fillin their name and password once they click on login button.
  const onVendorLogin = () => {
    axios.post('/vendor/login', { name: name, password: password }).then(response => {
      if (response.data.success) {
        // message.success('vendor login sevvess')
        props.history.push('/vendor', {
          vendor: response.data.vendor,
          vendors: [],
          position: [lat, lng]
        })
      } else {
        message.error(response.data.error)

      }
    }).catch(error => {
      console.log(error.response.data.error)
      message.error(error.response.data.error)
    })
  }
  // By clicking button 'skip', system allow a customer to view vendors and menu before log in. 
  const onSkip = () => {
    props.history.push('/customer', {
      position: [lat, lng],
      vendors: vendors
    })
  }


  const onCustomerRegister = (props) => {
    console.log(familyName);
    if (registerName && familyName && registerEmail && registerPassword) {
      const updateBody = {
        "name": registerName,
        "familyName": familyName,
        "email": registerEmail,
        "password": registerPassword,
      }
      axios.post('/customer/register', updateBody).then(response => {
        if (response.data.success) {
          message.success("Customer detail uploaded successfully!")
          // console.log(registerName);
        } else {
          message.error(response.data.error)
  
          // console.log(registerName);
        }
      })
      setRegisterOpen(!registerOpen);
    } else {
      message.error("Enter completed information")
    }
    
  }
  // collapse will open when you click on register
  const registerCollapse = (
    <>
      <Collapse in={registerOpen}>
        <p>

          <Form>
            <br />
            <h3 style={{ color: "#F4976C" }}>Register here</h3>

            <Form.Group >
              <Form.Label>Email </Form.Label>
              <FormControl style={{ fontSize: 10 }} type="email" placeholder="Please enter your email"
                onChange={e => setRegisterEmail(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Your first name </Form.Label>
              <FormControl style={{ fontSize: 10 }} type="string" placeholder="Please enter your given name"
                onChange={e => setRegisterName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Your family name </Form.Label>
              <Form.Control style={{ fontSize: 10 }} type="string" placeholder="Please enter your family name"
                onChange={e => setFamilyName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Your password</Form.Label>
              <FormControl style={{ fontSize: 10 }} placeholder="Please enter your password"
                onChange={e => setRegisterPassword(e.target.value)} />
            </Form.Group>

          </Form>


          <Button
            style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6', marginLeft: "20%" }}
            variant="primary"
            onClick={onCustomerRegister}
          >
            Sign up
      </Button>


          <Button
            style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6', marginLeft: "30%" }}
            variant="primary"
            onClick={() => setRegisterOpen(!registerOpen)}
          >
            Cancel
      </Button>
          <br />
        </p>
      </Collapse>
    </>
  )

  // collpase will open if you click 'Customer'
  const customerCollapse = (
    <>
      <Collapse in={customerOpen}>
        <p>
          <Form>
            <br />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control style={{ fontSize: 12 }} type="email" placeholder="Please enter your email"
                onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                Your info is secured with us.
          </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl style={{ fontSize: 12 }} type="password" placeholder="Please enter your password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>

          <p> <Link onClick={onSkip}>Proceed without login</Link> </p>

          <Button
            variant="primary"
            onClick={onCustomerLogin}
            size="lg"
            block
            style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6' }}>
            Login
          </Button>
        </p>
      </Collapse>
    </>
  )

  // collapse will open if you click on 'Vendor'
  const vendorCollapse = (
    <>
      <Collapse in={vendorOpen}>
        <p>
          <Form>
            <br />
            <Form.Group controlId="formBasic">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control style={{ fontSize: 12 }} placeholder="Please enter your vendor name"
                onChange={e => setName(e.target.value)} />
              <Form.Text className="text-muted">
                Your info is secured with us.
          </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Password</Form.Label>
              <FormControl style={{ fontSize: 12 }} type="password" placeholder="Please enter your password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>

          <p> <Link onClick={onSkip}>Proceed without login</Link> </p>

          <Button
            variant="primary"
            onClick={onVendorLogin}
            size="lg"
            block
            style={{ color: '#F4976C', backgroundColor: '#FBE8A6', borderColor: '#FBE8A6' }}>
            Login
          </Button>
        </p>
      </Collapse>
    </>
  )


  return (

    <div id="LogIn" style={{ width: '60%', margin: 'auto', marginTop: '2%' }}>
      <Jumbotron style={{ width: '90%', backgroundColor: 'white', margin: 'auto' }}>

        <center >
          <img src={image} style={{ width: '100%', margin: 'auto' }} alt="logo" />
        </center>

        <br />

        <h1 style={{ color: "#F4976C" }}>Welcome!</h1>
        <h6 style={{ color: '#707070' }}>Please choose your identity below</h6>

        <br />

        <p>
          <h6 style={{ color: '#707070', opacity: '50%' }}>I'm a...</h6>
        </p>

        <p>
          <Link onClick={() => setRegisterOpen(!registerOpen)} style={{ fontSize: 17 }}>New user? </Link>

          <Collapse>
            {registerCollapse}
          </Collapse>
        </p>

        <p>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipCustomer}>
            <Button
              onClick={() => setCustomerOpen(!customerOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={customerOpen}
              variant="primary"
              size="lg"
              block
              style={{ color: '#FBE8A6', backgroundColor: '#F4976C', borderColor: '#F4976C' }}
            >
              Customer
          </Button>
          </OverlayTrigger>

          <Collapse>
            {customerCollapse}
          </Collapse>

        </p>


        <div>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button
              onClick={() => setVendorOpen(!vendorOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={vendorOpen}
              variant="primary"
              size="lg"
              block
              style={{ color: '#707070', backgroundColor: '#F3F3F3', borderColor: '#F3F3F3' }}>
              Vendor
            </Button>
          </OverlayTrigger>

          <Collapse>
            {vendorCollapse}
          </Collapse>
        </div>


      </Jumbotron>
    </div>
  );
}

export default App;