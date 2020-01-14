import React, { Component } from "react";
import * as allRoutes from "./index";
import rolesConfig from "../../config/roles";
import { Route, withRouter, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowedRoutes: [],
      redirectRoutes: [] // เพิ่ม
    };
  }

  getUser = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // let username = jwtDecode(token)
    // console.log(username.name)
    if (token) {
      return jwtDecode(token);
    } else {
      return {
        role: "guest"
      };
    }
  };

  fetchRoute = () => {
    const user = this.getUser();
    let role = user.role;
    console.log(role);
    //alert(role);
    if (role) {
      this.setState({
        allowedRoutes: rolesConfig[role].routes,
        redirectRoutes: [rolesConfig[role].redirect] // เพิ่ม
      });
    } else {
      this.props.history.push("/");
    }
  };

  componentWillMount() {
    this.fetchRoute();
  }

  render() {
    return (
      <>
        <Switch>
          {this.state.allowedRoutes.map(route => {
            // console.log(route.url);
            return (
              <Route
                exact
                path={route.url}
                component={allRoutes[route.component]}
                key={route.url}
              />
            );
          })}

          {/* {this.props.role == "guest" ? <Redirect to="/" /> : null} */}

          {this.state.redirectRoutes.map(url => {
            // console.log(url);
            return <Redirect to={url} />;
          })}
        </Switch>
      </>
    );
  }
}

export default withRouter(PrivateRoute);
