import React from "react";
import "./App.css";
import Login from "./components/login";
import CreateAccount from "./components/CreateAccount/createAccount";
import Home from "./components/home/home";
import Admin from "./components/Admin/admin";
import ChangePassword from "./components/ChangePassword/changePassword";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './components/routes/PrivateRoute';

import { Layout } from "antd";
import { Redirect } from "react-router";

import RegistrationForm from "./components/CreateAccount/RegistrationForm";
import { Row, Col } from "antd";
const { Header, Content } = Layout;

function App() {
  
  return (
    <div>
      <Row type="flex" justify="center" align="middle">
        {/* <Col className="Setcenter"><Login/></Col> */}
        {/* <Col className="Setcenter"><CreateAccount/></Col> */}
       
              {/* <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={CreateAccount} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Redirect to="/" />
              </Switch> */}
              <PrivateRoute />
      </Row>
    </div>
  );
}

export default App;
