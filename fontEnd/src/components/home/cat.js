import React, { Component } from 'react'
import { Table,Button } from 'antd';
export default class cat extends Component {
    render() {

        const columns = [
            {
              title: 'Name',
              dataIndex: 'product.name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Price',
              dataIndex: 'product.price',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
            },
            {
                title: 'Action',
                dataIndex: '',
                render: (text,cartItem)=> <Button onClick = {()=>this.props.handleDelete(cartItem)}> Delete</Button>,
            }
          ];
          
          
          
          

        return (
            <div>
                <Table
    columns={columns}
    dataSource={this.props.cart}
   
  />

            
               
            </div>
        )
    }
}
