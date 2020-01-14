import React, { Component } from "react";
import { Table } from "antd";
import Axios from "../../config/axios.setup";

export default class UserManageFrom extends Component {

  state = {
    getuser:[],
   
  };

  fetchGetUser(){
    Axios.get('/getuser')
    .then(result => {
      
     this.setState({getuser:result.data})
      console.log(this.state.getuser)
    })
    .catch(err => {
      console.error(err);
     
    })
  }
  componentDidMount(){
    this.fetchGetUser()
}

deleteUser(id){
  // alert('oo')
  console.log(id)
  Axios.delete(`/delete-user/${id}`)
  .then(result => {
    console.log(result)
    this.fetchGetUser()
  //  this.setState({getuser:result.data})
  //   console.log(this.state.getuser)
  })
  .catch(err => {
    console.error(err);
   
  })
}

  render() {
    const columns = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Role", dataIndex: "role", key: "role" },
      { title: "E-mail", dataIndex: "email", key: "email" },
      {
        title: "Action",
        dataIndex: 'id',
        key: "x",
        render: (id) => <a onClick={()=>this.deleteUser(id)}>Delete</a>
      }
    ];

    // const data = [
    //   {
    //     key: 1,
    //     name: "Apichai Phongsanee",
    //     role: "user",
    //     email: "beer@gmail.com",
    //     description:
    //       " "
    //   },
    //   {
    //     key: 2,
    //     name: "Test",
    //     role: "user",
    //     email: "beer2@gmail.com",
    //     description:
    //       " "
    //   },
    //   {
    //     key: 3,
    //     name: "Administrator",
    //     role: "admin",
    //     email: "admin@gmail.com",
    //     description:
    //       " "
    //   }
    // ];

    return (
      <div>
        <Table
          columns={columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.description}</p>
          )}
          // dataSource={data}
          dataSource={this.state.getuser}
        />
      </div>
    );
  }
}
