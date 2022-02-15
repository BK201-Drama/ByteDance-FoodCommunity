import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Row, Layout, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import {
  menuList
} from '../../api/list';

const { Meta } = Card;
const { Header } = Layout;

export default function Home () {

  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(async () => {
    const List_ = await menuList();
    console.log(List_)
    setList(List_);
  }, []);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>菜谱一览</Divider>
      <Row>
      {
        list.map((item) => {
          return (
            <Col span={6}
              onClick={(e) => {
                // e.stopPropagation();
                // e.nativeEvent.stopImmediatePropagation();
                console.log("Col");
                navigate(`/menu/${item.menu_id}`);
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
                  avatar={<Avatar src={item.Avatar} onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    navigate(`/myZone/${item.username}`);
                  }}/>}
                  title={item.title}
                  description={item.synopsis}
                />
              </Card>
              <div style={{ height: 40 }}></div>
            </Col>
          )
        })
      }
      </Row>
    </>
  )
}