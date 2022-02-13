import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Row, Layout } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import {
  menuList
} from '../../api/list';

const { Meta } = Card;
const { Header } = Layout;

export default function Home () {

  const [list, setList] = useState([]);

  useEffect(async () => {
    const List_ = await menuList();
    console.log(List_)
    setList(List_);
  }, []);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Row>
      {
        list.map((item) => {
          return (
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
          )
        })
      }
      </Row>
    </>
  )
}