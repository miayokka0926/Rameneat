// main log in page of the website
import { useState, useEffect } from "react";
import {
  Jumbotron,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
  FormControl,
} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { message, Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import axios from "../commons/axios.js";
import image from "../pic/logo1.jpg";
const { Link } = Typography;

function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [vendors, setVendors] = useState([]);

  const [open, setOpen] = useState(false);
  // get customer location oonce they get access to our website.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
    axios.get("/vendor?lat=" + lat + "&lng=" + lng).then((response) => {
      console.log(response);
      setVendors(response.data.vendors);
    });
  }, [lat, lng]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {" "}
      feature opening soon{" "}
    </Tooltip>
  );

  const renderTooltipCustomer = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       start your tasty journey
    </Tooltip>
  );
  // ask customer to fillin their email and password once they click on login button.
  const onLogin = () => {
    axios
      .post("/customer/login", { email: email, password: password })
      .then((response) => {
        if (response.data.success) {
          props.history.push("/customer", {
            customer: response.data.customer,
            vendors: vendors,
            position: [lat, lng],
          });
        } else {
          message.error(response.data.error);
          // setShow(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        message.error(error.response.data.message);
      });
  };
  // By clicking button 'skip', system allow a customer to view vendors and menu before log in.
  const onSkip = () => {
    props.history.push("/customer", {
      position: [lat, lng],
      vendors: vendors,
    });
  };
  // message will be displayed if a customer place their mouse on 'forget password' icon.
  const findPassword = (props) => {
    <Tooltip id="button-tooltip" {...props}>
      {" "}
      feature opening soon{" "}
    </Tooltip>;
  };
  // the UI design of log in page.
  return (
    <div id="LogIn" style={{ width: "60%", margin: "auto", marginTop: "2%" }}>
      <Jumbotron
        style={{ width: "90%", backgroundColor: "white", margin: "auto" }}
      >
        <center>
          <img
            src={image}
            style={{ width: "100%", margin: "auto" }}
            alt="logo"
          />
        </center>

        <br />

        <h1 style={{ color: "#F4976C" }}>Welcome!</h1>
        <h6 style={{ color: "#707070" }}>Please choose your identity below</h6>

        <br />

        <p>
          <h6 style={{ color: "#707070", opacity: "50%" }}>I'm a...</h6>
        </p>

        <p>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipCustomer}
          >
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              variant="primary"
              size="lg"
              block
              style={{
                color: "#FBE8A6",
                backgroundColor: "#F4976C",
                borderColor: "#F4976C",
              }}
            >
              Customer
            </Button>
          </OverlayTrigger>

          <Collapse in={open}>
            <p>
              <Form>
                <br />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    style={{ fontSize: 12 }}
                    type="email"
                    placeholder="Please enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Your info is secured with us.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <FormControl
                    style={{ fontSize: 12 }}
                    type="password"
                    placeholder="Please enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>

              <p>
                {" "}
                <Link onClick={findPassword}>Forget Password?</Link>{" "}
              </p>
              <p>
                {" "}
                <Link onClick={onSkip}>Skip</Link>{" "}
              </p>

              <Button
                variant="primary"
                onClick={onLogin}
                size="lg"
                block
                style={{
                  color: "#F4976C",
                  backgroundColor: "#FBE8A6",
                  borderColor: "#FBE8A6",
                }}
              >
                Login
              </Button>
            </p>
          </Collapse>
        </p>

        <div>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button
              variant="primary"
              size="lg"
              block
              style={{
                color: "#707070",
                backgroundColor: "#F3F3F3",
                borderColor: "#F3F3F3",
              }}
            >
              Vendor
            </Button>
          </OverlayTrigger>
        </div>
      </Jumbotron>
    </div>
  );
}

export default App;
