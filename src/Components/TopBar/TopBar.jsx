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
  Button,
  Popconfirm,
  Tooltip
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './TopBar.css';
import Avatar from 'antd/lib/avatar/avatar';

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

export default function TopBar (props) {

  const data = window.sessionStorage.getItem('store');

  let navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(async () => {
    const datag = JSON.parse(data);
    if (datag) {
      setAvatar(datag.data.Avatar);
      setUsername(datag.data.username);
    }
  }, []);

  return (
    <Header style={{background: '#fff', position: 'fixed', zIndex: 1, width: '100%'}}>
      <Menu mode="horizontal">
        <Col span={3}>
          {/* <Image
            width={50}
            preview={false}
            // src="https://bk201-drama.app.cloudendpoint.cn/uploads/1644679910323.jpg"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          /> */}
        </Col>
        <Col 
          span={3} style={{color: '#008c8c', fontSize: 24}} 
          onClick={() => {
            navigate('/');
          }}
        >美食平台</Col>
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
                onClick={() => {navigate(`/myZone/${username}`)}}
              />
            </Col>
            <Col span={2} style={{color: '#008c8c', marginLeft: 10}}>欢迎你: {username}</Col>
            <Col span={1} style={{color: '#008c8c', marginLeft: 10}}>
              <Tooltip placement="bottomLeft" title="添加菜谱">
                <Button 
                  onClick={() => {
                    navigate('/addMenu');
                  }}
                  shape="circle"
                  icon={<PlusOutlined />}
                  type="primary"
                ></Button>
              </Tooltip>
            </Col>
            <Col span={1} style={{color: '#008c8c', marginLeft: 10}}>
              <Button 
                onClick={() => {
                  window.sessionStorage.removeItem("store");
                  setAvatar(null);
                  navigate('/');
                }}
              >退出登录</Button>
            </Col>
          </>
        }
      </Menu>
      
    </Header>
  );
}