import React from 'react';
import { useRoutes, Route, Routes } from 'react-router-dom';
import './PageContainer.css';

import { Layout } from 'antd';
import TopBar from '../Components/TopBar/TopBar';

import NoPermission from './nopermission/NoPermission';
import MyZone from './myZone/myZone';
import Home from './home/home';
import AddMenu from './addMenu/addMenu';
import Concern from './concern/Concern';
import Concerned from './concerned/Concerned';
import Menu from './menu/Menu';
import TagPage from './tagPage/TagPage';
import IsTagPage from './isTagPage/IsTagPage';
import SearchPage from './searchPage/SearchPage';

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
            <Route path='/addMenu' element={<AddMenu/>} exact/>
            
            <Route path="/myZone/:username" element={<MyZone />} exact/>
            <Route path="/Concern/:username" element={<Concern />} exact/>
            <Route path="/Concerned/:username" element={<Concerned />} exact/>
            <Route path="/menu/:menu_id" element={<Menu />} exact/>
            <Route path="/TagPage" element={<TagPage />} exact/>
            <Route path="/TagPage/:classify_name" element={<IsTagPage />} exact/>
            <Route path="/SearchPage" element={<SearchPage />} exact/>
            
            <Route path="*" element={<NoPermission />} exact/>
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}