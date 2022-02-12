import React, {
  useEffect,
  useState
} from 'react';

import {
  Layout,
  Menu,
  Switch,
  Image,
  Input,
  Col
} from 'antd';

import './TopBar.css';

import { login } from '../../api/login';

const { Header } = Layout;
const { Search } = Input;

export default function TopBar () {
  useEffect(async () => {
    const res = await login();
    console.log(res);
    console.log(123);
  }, []);
  return (
    <Header style={{background: '#fff'}}>
      <Menu mode="horizontal">
        <Col span={3}>
          {/* <Image
            width={50}
            preview={false}
            // src="https://bk201-drama.app.cloudendpoint.cn/uploads/1644679910323.jpg"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          /> */}
        </Col>
        <Col span={3} style={{color: '#008c8c', fontSize: 24}}>美食平台</Col>
        <Col span={6}>
          <Search
            style={{marginTop: 12, marginLeft: 50}}
            placeholder="搜索菜谱"
            enterButton="搜索"
            size="large"
            // onSearch={onSearch}
          />
        </Col>
        <Col span={3} style={{color: '#008c8c', fontSize: 24, marginLeft: 100}}>标签</Col>
      </Menu>
      
    </Header>
  );
}