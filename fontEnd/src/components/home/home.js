import React, { Component } from "react";
import ShoppingCart from "./shoppingCart";
import NavBar from "./NavBar";
import { Layout } from "antd";
const { Header } = Layout;
export default class Home extends Component {

  render() {
    return (
      <Layout>
        <Header
           style={{
             backgroundColor: "#4267B2",
             textAlign: 'right'
           }}
        >
          <NavBar />
        </Header>
        <div>
          <ShoppingCart />
        </div>
      </Layout>
    );
  }
}
