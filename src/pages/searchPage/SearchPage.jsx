import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Empty, Card, Avatar, Col, Row, Layout, Divider } from 'antd';
import store from '../../redux/store';

import { searchMenu } from '../../api/menu';

const { Meta } = Card;

export default function SearchPage () {

  const res = store.getState() ? store.getState() : '';
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [input, setInput] = useState(res);

  
  useEffect(async () => {
    console.log("res", res);

    // 抽象相等, '' == 0
    if (res == 0) {
      return;
    }
    const List = await searchMenu(input);
    await setList(List);
  }, []);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>搜索结果</Divider>
      <Row>
      {
        list.map((item) => {
          return (
            <Col span={6}
              onClick={(e) => {
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
                      console.log(item)
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
  );
}