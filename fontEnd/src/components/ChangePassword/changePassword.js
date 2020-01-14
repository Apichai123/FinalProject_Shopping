import ChangePasswordForm from "./ChangePasswordForm"
import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import "./changePasswordModel.css";

export default class ChangePassword extends Component {
  render() {
    return (
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "550px",
          height: "100vh"
        }}
      >
        <div  className="containerChangePW">
          <Col id="shadowForm" >
            <Row>
              <div className="CreateAccount0">
                <h1>Change your password</h1>
              </div>
            </Row>
            <Row>
              <div>
                <Form className="formAreaChangePW" id="shadowForm">
                  <Row type="flex" align="middle">
                  <div>
                  <ChangePasswordForm/>
                 </div>
                  </Row>
                </Form>
              </div>
            </Row>
            
          </Col>
        </div>
      </div>
    );
  }
}
