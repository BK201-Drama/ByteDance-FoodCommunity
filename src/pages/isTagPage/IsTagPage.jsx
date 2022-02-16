import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Row, Layout, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { menuTagList } from '../../api/list';
import { getAvatar } from '../../api/menu';

const { Meta } = Card;

export default function IsTagPage () {
  
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(async () => {

    let str = window.location.href;
    const classifyNameArr = str.split('/');
    const classifyName = classifyNameArr[classifyNameArr.length - 1];

    const List_ = await menuTagList(classifyName);
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
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
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
                <a>
                  <Meta
                    avatar={<Avatar src={item.Avatar} onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      navigate(`/myZone/${item.username}`);
                    }}/>}
                    title={item.title}
                    description={item.synopsis}
                  />
                </a>
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