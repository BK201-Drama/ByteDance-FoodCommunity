import React, { 
  useState, 
  useEffect 
} from 'react';

import {
  useNavigate
} from 'react-router-dom'

import {
  Form,
  Checkbox,
  Input,
  Button,
  notification
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Sign.css';
import Img from '../../assets/background.jpg';

import {
  sign
} from '../../api/login';

export default function Sign () {

  let navigate = new useNavigate();

  const onFinish = async (values) => {
    const res = await sign(values.username, values.password);
    console.log(res);
    if (res.data === null) {
      notification.open({
        message: '注册失败',
        description: '账号密码错误',
        duration: 1
      });
      return
    }
    window.sessionStorage.setItem('store', JSON.stringify(res));
    navigate('/');
    notification.open({
      message: '注册成功',
      description: '欢迎来到美食平台',
      duration: 1
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.open({
      message: '登录失败',
      description: '请重新登录',
      duration: 1
    });
  };

  return (
    <div>
      <div>
        <img className={"myImg"} src={Img}/>
      </div>
      <div className={"FormBox"}>
        <div className={"myForm"}>
          <h1 style={{textAlign: 'center', color: '#778'}}>Sign</h1>
          <Form
            name="normal_login"
            className={"login-form"}
            initialValues={{ username: 'admin', password: 'admin' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder="Username" key="username"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className={"site-form-item-icon"} />}
                type="password"
                placeholder="Password"
                key="password"
              />
            </Form.Item>
      
            <Form.Item>
              <Button type="primary" htmlType="submit" className={"login-form-button"}>
                Sign
              </Button>

              <Button 
                className={"login-form-button"} 
                style={{marginLeft: 220}} 
                onClick={() => {navigate('/')}}
              >
                返回首页
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}