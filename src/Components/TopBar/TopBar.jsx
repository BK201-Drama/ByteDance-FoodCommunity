import React, {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom'

import {
  Layout,
  Menu,
  // Switch,
  Image,
  Input,
  Col,
  Button
} from 'antd';
import { login } from '../../api/login';
import store from '../../redux/store';

import './TopBar.css';
import Avatar from 'antd/lib/avatar/avatar';

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

export default function TopBar (props) {

  const data = window.sessionStorage.getItem('store');

  let navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);

  useEffect(async () => {
    // console.log(res);
    console.log(data);
    // data = JSON.parse(data);
    const datag = JSON.parse(data);
    console.log("test data", datag);
    // useAvatar(datag.data.Avatar);
    if (datag) {
      setAvatar(datag.data.Avatar);
    }
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
        <Col span={5} style={{color: '#008c8c', fontSize: 24, marginLeft: 100}}>标签</Col>
        {
          avatar === null ? 
          <>
            <Col span={1} style={{color: '#008c8c', marginLeft: 100}}>
              <Button onClick={() => {navigate("/login")}}>登录</Button>
            </Col>
            <Col span={1} style={{color: '#008c8c', marginLeft: 10}}>
              <Button onClick={() => {navigate("/sign")}}>注册</Button>
            </Col>
          </> :
          <>
            <Col span={1}>
              <Image 
                width={40}
                src={avatar}
                preview={false}
                onClick={() => {navigate("/sign")}}
              />
            </Col>
            <Col span={1} style={{color: '#008c8c', marginLeft: 10}}>
              <Button 
                onClick={() => {
                  window.sessionStorage.removeItem("store");
                  setAvatar(null);
                }}
              >退出登录</Button>
            </Col>
          </>
        }
      </Menu>
      
    </Header>
  );
}