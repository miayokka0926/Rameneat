import {useState} from 'react';
import {Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {message} from 'antd';
import axios from '../commons/axios.js';


function App(props) {

  /*
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[email, setEmail] = useState('');
  const[password,setPassword] = useState('');

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}></Tooltip>
  )

  const onLogin = () => {
    axios.post('/customer/login', {email: email, password:password}).then(response=>{
      if (response.data.success){
        props.history.push('/customer', {
          customer: response.data.customer,
        })
      }else {
        Message.error(response.data.error)
      }
    }).catch(error =>{
      console.log(error)
    })
  }

*/

  return (
    <div className="App">
     <h1>Hello!</h1>
    </div>
  );
}

export default App;
