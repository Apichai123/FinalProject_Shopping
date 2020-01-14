import React, { Component } from 'react'
import { Row, Col } from "antd";
import Product from "./product";
export default class Products extends Component {
renderProducts(){
    return this.props.products.map(product =>(
        <Col span = {8}>
          <Product productDetail = {product} 
          handleClickAddToCard = {this.props.handleClickAddToCard}
          />
          
        </Col>
        
        ))
    }


    render() {
        return (
            
               <Row>
                   {this.renderProducts()}
               </Row>


        )
    }
}
