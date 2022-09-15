import React, { useState } from "react";
import 'antd/dist/antd.min.css'
import 'antd/dist/antd.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu } from "antd";
import Update_Product from "./components/UpdateProduct/Update_Product";
import {MenuFoldOutlined, HomeOutlined,UnorderedListOutlined} from '@ant-design/icons';
import Dashboard from "./components/Home/Dashboard";
import Them_danhmuc from "./components/Danhmuc/Them_danhmuc";
import Chinhsua_danhmuc from "./components/Danhmuc/Chinhsua_danhmuc";
import Product from "./components/Product/Product";
const { Header, Content, Footer, Sider } = Layout;

 function App() {
 

  const [collapsed,setcollapsed] = useState(false)

 
  const onCollapse =(collapsed) =>{
    setcollapsed(collapsed)
  }
  

  const toggle =()=>{
    setcollapsed (!collapsed)
  }

 
    return (
      <Router>

<div className="App">
      
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
              <HomeOutlined />
                <span>Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2"  >
              <UnorderedListOutlined />
                <span>Lưu sản phẩm</span>
                <Link to="/b" />
              </Menu.Item>
              <Menu.Item key="3"  >
              <UnorderedListOutlined />
                <span>CRUD danh mục</span>
                <Link to="/c" />
              </Menu.Item>
            
            </Menu>


          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
              <MenuFoldOutlined 
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                style={{ cursor: "pointer" }}
                onClick={toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
               <Switch>
              
                  <Route path="/b" component={Product}/>
                  < Route path="/c" component={Them_danhmuc}/>
                 
                  <Route path="/" component={Dashboard} exact={true}/>
                </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
</div>
      </Router>
    );
  }

export default App;
