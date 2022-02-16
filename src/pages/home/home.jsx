import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Row, Layout, Divider, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, HeartOutlined, StarOutlined, HeartFilled, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import {
  menuList
} from '../../api/list';

import {
  addListing,
  deleteListing,
  isListed
} from '../../api/listing';

const { Meta } = Card;

export default function Home () {

  const data = JSON.parse(window.sessionStorage.getItem('store'));
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const [star, setStar] = useState([]);

  useEffect(async () => {
    const List_ = await menuList();
    console.log(List_)
    setList(List_);
  }, []);

  useEffect(async () => {
    const req = await Promise.all(
      list.map(async (item) => {
        const isList = await isListed(data.data.username, item.menu_id);
        // console.log(isList.isListed);
        return isList.isListed;
      })
    );
    await setStar(req);
  }, [list]);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>菜谱一览</Divider>
      <Row>
      {
        list.map((item, index) => {
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
                actions={[
                  star[index] ? 
                  <StarFilled onClick={async (e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    if (!data) {
                      return;
                    }
                    const res = await deleteListing(data.data.username, item.menu_id);
                    console.log("res", res);
                    if (res.username) {
                      message.success('取消收藏成功', 1);
                      await setStar(star => {
                        const ma = star.map((item, idx) => {
                          if (idx === index) {
                            return !item;
                          }
                          return item;
                        });
                        console.log("ma", ma);
                        return ma;
                      });
                    }
                  }}/> :
                  <StarOutlined onClick={async (e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    if (!data) {
                      return;
                    }
                    const res = await addListing(data.data.username, item.menu_id);
                    if (res.username) {
                      const star_ = star[index];
                      console.log('star_', star_)
                      message.success('收藏成功', 1);
                      console.log("star", star);
                      await setStar(star => {
                        const ma = star.map((item, idx) => {
                          if (idx === index) {
                            return !item;
                          }
                          return item;
                        });
                        console.log("ma", ma);
                        return ma;
                      });
                    }
                  }}/>
                ]}
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