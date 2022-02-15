import React, { useEffect, useState } from 'react';
import { Avatar, Image, Col, Row, Empty, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { concernedList } from '../../api/aboutConcern';

export default function Concerned () {
  const navigate = useNavigate();

  const [concernedListArr, setConcernedListArr] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(async () => {
    let str = window.location.href;
    const userArr = str.split('/');
    const user = userArr[userArr.length - 1];
    console.log(user)
    const res = await concernedList(user);
    await setConcernedListArr(res);
    await setUsername(user);
  }, []);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>我的粉丝列表</Divider>
      <Row>
      {
        concernedListArr.length === 0 ?
        <Empty style={{marginLeft: '40%', color: '#008c8c'}} description={"你没有任何粉丝噢"}/>:
        concernedListArr.map((item) => {
          return (
            <Col style={{marginRight: 20}} onClick={() => {
              navigate(`/myZone/${item.username}`);
            }}>
              <Avatar src={item.Avatar} size={100}/>
              <div style={{marginTop: 10, marginLeft: 25}}>{item.username}</div>
            </Col>
          )
        })
      }
      </Row>
      <div style={{ height: 50 }}></div>
    </>
  )
}