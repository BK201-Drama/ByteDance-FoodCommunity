import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Button, Avatar, Card, Divider, Empty } from 'antd';
import {
  listing
} from '../../api/listing';
import {
  infoList
} from '../../api/info';

const { Meta } = Card;

export default function MyZone (props) {

  const data = JSON.parse(window.sessionStorage.getItem('store'));

  const [listingList, setListingList] = useState([]);
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState({});

  useEffect(async () => {
    const userObject = data.data;
    const list = await listing(userObject.username);
    const res = await infoList(list.username);
    await setListingList(list.listing);
    await setUsername(list.username);
    await setInfo(res);
  }, []);

  return (
    <>
      <div style={{marginTop: 70}}/>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>个人信息</Divider>
      <div style={{marginTop: 30}}/>
      <Row gutter={16}>
        <Col span={2}></Col>
        <Col span={4}>
          <Avatar size={170} 
            src={info.Avatar}
          >admin</Avatar>
        </Col>
        <Col span={7}>
          <Card title={`账户: ${info.username}`} style={{ width: 300 }} extra={<a href="/">修改</a>}>
            <p>地址: {`${info.address}`} ——— {`${info.join_time}`}加入</p>
            <p>签名: {`${info.signature}`}</p>
          </Card>
        </Col>
        <div style={{width: '30%', height: 250}}>
          <Row gutter={16} style={{background: '#fff', paddingTop: 20, paddingBottom: 45}}>
            <Col span={3}></Col>
            <Col span={10}>
              <Statistic title="关注" value={`${info.concern_num}`} />
            </Col>
            <Col span={11}>
              <Statistic title=" 粉丝" value={`${info.concerned_num}`} />
              {
                username === data.data.username ? 
                <></> :
                <Button 
                  style={{ marginTop: 16 }} 
                  type="primary"
                >
                  + 关注
                </Button>
              }
            </Col>
          </Row>
        </div>
      </Row>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>收藏</Divider>
      {
        listingList.length === 0 ? 
        <>
          <Empty description="收藏列表啥都没有" style={{color: '#008c8c', fontSize: 10}}/>
          <div style={{marginTop: 95}}/>
        </> : 
        listingList.map((item) => {
          <Col span={6}
            onClick={() => {
              console.log(123)
            }}
          >
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="err"
                  src={item.menu_pic}
                />
              }
            >
              <Meta
                avatar={<Avatar src={item.Avatar} />}
                title={item.title}
                description={item.synopsis}
              />
            </Card>
            <div style={{ height: 40 }}></div>
          </Col>
        })
      }
    </>
  );
}