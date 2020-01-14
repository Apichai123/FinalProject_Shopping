import React, { Component } from "react";
import { Tabs, Layout } from "antd";
import NavBar from "../home/NavBar";
import AddProduct from "./addProduct";
import UserManage from "./userManage";
const { TabPane } = Tabs;
const { Header } = Layout;

function callback(key) {
  console.log(key);
}

export default class Admin extends Component {
  render() {
    return (
      <Layout>
        <Header
          style={{
            backgroundColor: "DarkGreen ",
            textAlign: "right"
          }}
        >
          <NavBar />
        </Header>

        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Add Product" key="1">
              <AddProduct />
            </TabPane>
            <TabPane tab="User Management" key="2">
               <UserManage/>
            </TabPane>
            <TabPane tab="Order" key="3">
              Order
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    );
  }
}
