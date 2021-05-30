// customer main page, allow customers to view vendor location and its menu before login, and
// allow customers to place and view orders after login.
import { useState, useEffect } from "react";
import axios from "../commons/axios";

import LeafletMap from "../components/LeafletMap.js";
import Header from "../components/Header.js";

function CustomerMain(props) {

  const [orders, setOrders] = useState([]);
  const [snacks, setSnacks] = useState([]);


  // display page header and 'view orders' button.
  useEffect(() => {

    if (props.location.state.customer) {

      console.log(props.location.state.position)
      console.log(props.location.state.vendors)
      axios
        .get("/order?customer=" + props.location.state.customer.id)
        .then(response => {
          setOrders(response.data.allOrders)
        });
    }

    axios.get("/snack").then(response => {
      setSnacks(response.data.snacks)
    });
  }, [props.location.state.position, props.location.state.vendors, props.location.state.customer]);
  
  //render out the page UI
  return (
    <div>

      <Header
        id = {props.id}
        customer={props.location.state.customer}
        orders={orders}
        vendors={props.location.state.vendors}/>


      <LeafletMap
        center={props.location.state.position}
        vendors={props.location.state.vendors}
        snacks={snacks}
        customer={props.location.state.customer}
      />
    </div>
  );
}

export default CustomerMain;