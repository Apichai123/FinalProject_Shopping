import React, { Component } from 'react'
import UserManageFrom from "./userManageFrom";
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
export default class UserManage extends Component {
    render() {
        return (
            <>
            <Row>
            <Col span={8}></Col>
            <Col span={8}><UserManageFrom/></Col>
            <Col span={8}></Col>
          </Row>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "550px",
                height: "70vh"
              }}
            >
            
            </div>
            </>
        )
    }
}
