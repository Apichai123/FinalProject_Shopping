// imr
//import React from 'react'
import { Row, Col, Result } from "antd";
import Cat from "./cat";
import  {uniqueId} from 'lodash'

import React, { Component } from "react";
import PropTypes from "prop-types";
import Products from "./products";
import Categories from "./Categories";

import Axios from 'axios';
//import Axios from '../../config/axios.setup'
//rcc
export class ShoppingCart extends Component {
  // static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      Categories: [],
      ProductsList: [],

      cart: [],
      selestCategoriesID: null
    };
    this.handCategoryID = this.handCategoryID.bind(this)
    this.handleClickAddToCard = this.handleClickAddToCard.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

async componentDidMount(){
  const result1 = await Axios.get('http://localhost:9000/product-category')
  const result2 = await Axios.get('http://localhost:9000/product')
  console.log(result2)
this.setState({
  ProductsList:result2.data,
  Categories:result1.data,
  selestCategoriesID:result1.data[0].id

})

//  Axios.get('http://localhost:3030/product-category').then(result=>{
//    console.log(result)
// })

}

  filterProduct(){
   const id = this.state.selestCategoriesID;
   if(id==null){
     return [] 
   }else{
     return this.state.ProductsList.filter(products=>products.ProductCategoryId==id)
   }

  }

handCategoryID(id){
  this.setState({
  selestCategoriesID:id
  });
}

handleClickAddToCard(product){
  // this.setState({
  // cart: this.state.cart.concat(product)
  // })
  if(this.state.cart.find(cartItem => cartItem.product.id === product.id)){
    cart : this.setState({
      cart:this.state.cart.map(cartItem=>
        cartItem.product.id === product.id ? 
        {...cartItem,amount: cartItem.amount+1}:cartItem)
        
    })
  }else{this.setState({
    cart: [...this.state.cart,{uid:uniqueId(),product,amount:1}]
  })}
}
        
  
handleDelete(uid){
  this.setState({cart: this.state.cart.filter(X=>X.product.id !== uid.product.id)})
}

  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={4}>
          <Categories categories={this.state.Categories} 
          handleCategoryIDFuntion = {this.handCategoryID}
          selectedID = {this.state.selestCategoriesID}
          
          />
        </Col>
        <Col span={13}>
          <Products products = {this.filterProduct()}
          handleClickAddToCard = {this.handleClickAddToCard} />
        </Col>
        <Col span={6}>
          <Cat cart = {this.state.cart} 
          handleDelete = {this.handleDelete}
          />
        </Col>
      </Row>
    );
  }
}

export default ShoppingCart;
