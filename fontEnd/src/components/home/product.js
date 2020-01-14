import React, { Component } from "react";
import { Card, Button } from "antd";
import { Row, Col, Typography } from "antd";
const { Text } = Typography;

export default class product extends Component {
  render() {
    const product = this.props.productDetail;
    return (
      <Card hoverable cover={<img src={product.image} height="230" width="100"/>}>
        <h4 style={{ height: "50px" }}>{product.name}</h4>
        <p style={{ height: "150px", overflowY: "scroll" }}>
          {product.description}
        </p>

        <Row>
          <Text code> {product.price} Baht </Text>
          <Button
            onClick={() => 
              this.props.handleClickAddToCard(product)
            }
          >
            {" "}
            Add to Cate
          </Button>
        </Row>
      </Card>
    );
  }
}
