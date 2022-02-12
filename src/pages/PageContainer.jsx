import React from 'react';
import { useRoutes, Route, Routes } from 'react-router-dom';
import './PageContainer.css';

import { Layout } from 'antd';
import TopBar from '../Components/TopBar/TopBar';

import Login from './login/Login'
import Sign from './sign/Sign';
import NoPermission from './nopermission/NoPermission';

const { Content } = Layout;

/**
 * 路由配置
 * 全局组件的注册
 */
export default function PageContainer () {

  // const routes = useRoutes([
  //   { path: "/login", element: <Login />},
  //   { path: "/sign", element: <Sign />},
  //   { path: "*", element: <NoPermission />}
  // ]);

  return (
    <Layout>
      <TopBar/>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ paddingTop: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} exact/>
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}