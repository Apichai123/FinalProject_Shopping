import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Col, Row, Avatar} from "antd";
import Logo from "../img/Logo.jpg";
import "./loginModel.css";
import { Link } from "react-router-dom";
import Axios from '../config/axios.setup'
import { failLoginNotification, successLoginNotification } from './Notification/notification'


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUserName = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  // handleLogin = () => {
  //   alert(this.state.username + "  " + this.state.password);
  //   this.setState({ username: "" });
  //   this.setState({ password: "" });
  // };


  handleSubmit = (e) => {
    e.preventDefault()
    const username = this.state.username
    const password = this.state.password
    Axios.post('/loginUser', { username, password })
      .then(result => {
        console.log(result.data)
        successLoginNotification()
        const token = localStorage.setItem("ACCESS_TOKEN", result.data.token)
        
        this.props.history.push("/home")
        window.location.reload(true)
        // this.props.history.push("/admin")
      })
      .catch(err => {
        console.error(err);
        failLoginNotification("something went wrong.")
      })
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "350px",
          height: "100vh"
        }}
      >
        <Col id="demoObject">
          <Row>
            <div className="container0">
              <Col>
                <Row>
                  <div className="CreateAccount">
                    <Button>
                    <Link to="/signup"><b>Create Account</b></Link>
                    </Button>
                    {/* <Link to="/signup"><b>Create Account</b></Link> */}
                  </div>
                </Row>
                <Row>
                  <div className="Setcenter ">
                    {/* <Avatar  size={210} src={"https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"} /> */}
                    <Avatar size={220} src={Logo} />
                  </div>
                </Row>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="container">
              <Form onSubmit={() => {}}> 
              {/* <Form onSubmit={this.handleSubmit}> */}
                <div className="login-form">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <h1>USER LOGIN </h1>
                  </div>
                  <Input
                    onChange={this.handleUserName}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                    required
                  />
                  <div className="input-form">
                    <Input.Password
                      onChange={this.handlePassword}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <Row type="flex" justify="center" align="middle">
                    <Col>
                      <Checkbox> Remember </Checkbox>
                    </Col>
                    <Col className="Forgot-form">
                      <a>Forgot password ? </a>
                    </Col>
                  </Row>
                  <div className="Setcenter ">
                    <Button
                      // onClick={this.handleLogin}
                      onClick={this.handleSubmit}
                      type="primary"
                      htmlType="submit"
                      className="Button-form"
                    >
                      <b>Login</b>
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Row>
        </Col>
      </div>
    );
  }
}
