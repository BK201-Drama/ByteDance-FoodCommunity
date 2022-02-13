import React from 'react';
import { useRoutes, Route, Routes } from 'react-router-dom';
import './PageContainer.css';

import { Layout } from 'antd';
import TopBar from '../Components/TopBar/TopBar';

import NoPermission from './nopermission/NoPermission';
import MyZone from './myZone/myZone';
import Home from './home/home';

const { Content } = Layout;

/**
 * 路由配置
 * 全局组件的注册
 */
export default function PageContainer () {

  return (
    <Layout>
      <TopBar/>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ paddingTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="/myZone" element={<MyZone />} exact/>
            <Route path="*" element={<NoPermission />} exact/>
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}