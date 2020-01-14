import React, { Component } from "react";
import { Row, Col ,Button ,Menu ,Dropdown} from "antd";
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from "jwt-decode";
export const TOKEN = "ACCESS_TOKEN"
export default class NavBar extends Component {
handleLogout = () => {
         //this.props.logout()
         //this.props.history.push('/login')
          window.location.reload(true);
        
          localStorage.removeItem(TOKEN)
      }

      getUser = () => {
        let token = localStorage.getItem("ACCESS_TOKEN");
        // let username = jwtDecode(token)
        // console.log(username.name)
        if (token) {
          return jwtDecode(token);
        } else {
          return {
            role: "guest"
          };
        }
      };


  render() {
    let username = this.getUser()
     //console.log(username.name)
    let ShowUsername = username.name
    
    const menu = (
        <Menu>
          <Menu.Item>
            <Link to="/change-password">
              เปลี่ยนรหัสผ่าน
            </Link>
          </Menu.Item>
          <Menu.Item>
            {/* <Link onClick={() => this.handleLogout()} to='#'> */}
            <Link onClick={() => this.handleLogout() } to="/">
              ออกจากระบบ
            </Link>
          </Menu.Item>
        </Menu>
      );

    return (
     
        <Row type="flex" justify="end">
        
           <Col>
           <Dropdown overlay={menu}>
              <Col span={6} type="flex" align="start" >
                <Link to="/my-profile">
                  <Button type="link" ><h3 style={{color:'#ffffff'}}>สวัสดี {ShowUsername} </h3></Button>
                </Link>
              </Col>
            </Dropdown>
           </Col>
        </Row>
     
    );
  }
}
