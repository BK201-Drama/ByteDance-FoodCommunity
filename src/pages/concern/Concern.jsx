import React, { useEffect, useState } from 'react';
import { Avatar, Image, Col, Row, Empty, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { concernList } from '../../api/aboutConcern';

export default function Concern () {
  const navigate = useNavigate();

  const [concernListArr, setConcernListArr] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(async () => {
    let str = window.location.href;
    const userArr = str.split('/');
    const user = userArr[userArr.length - 1];
    console.log(user)
    const res = await concernList(user);
    await setConcernListArr(res);
    await setUsername(user);
  }, []);

  useEffect(() => {
    console.log(concernListArr)
  }, [concernListArr])

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>我的关注列表</Divider>
      <Row>
      {
        concernListArr.length === 0 ?
        <Empty style={{marginLeft: '40%', color: '#008c8c'}} description={"你没有关注过任何人噢"}/>:
        concernListArr.map((item) => {
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