import RegistrationForm from "./RegistrationForm"
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
import "./createAccountModel.css";

export default class CreateAccount extends Component {
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
        <div  className="containerAcc">
          <Col id="shadowForm" >
            <Row>
              <div className="CreateAccount0">
                <h1>Create your account</h1>
              </div>
            </Row>
            <Row>
              <div>
                <Form className="formAreaAcc" id="shadowForm">
                  <Row type="flex" align="middle">
                  <div>
                  <RegistrationForm/>
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
