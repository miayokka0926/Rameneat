
import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./pages/App.js";
import CustomerMain from "./pages/CustomerMain.js";

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={CustomerMain}></Route>
                    
                </Switch>
                
            </BrowserRouter>
        )
    }
}

export default Router;