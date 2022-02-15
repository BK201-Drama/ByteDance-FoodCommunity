import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Button, Avatar, Card, Divider, Empty, Image, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  listing
} from '../../api/listing';
import {
  infoList, menuByMySelfList
} from '../../api/info';
import {
  isConcern,
  addConcern,
  cancelConcern
} from '../../api/aboutConcern';

const { Meta } = Card;

export default function MyZone (props) {

  const data = JSON.parse(window.sessionStorage.getItem('store'));

  const [listingList, setListingList] = useState([]);
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState({});
  const [menuList, setMenuList] = useState([]);
  const [isConcerned, setIsConcerned] = useState(true);
  const navigate = useNavigate();

  const [concernNum, setConcernNum] = useState(0);
  const [concernedNum, setConcernedNum] = useState(0);

  useEffect(async () => {
    const userObject = data.data;

    let str = window.location.href;
    const userArr = str.split('/');
    const user = userArr[userArr.length - 1];
    const list = await listing(user);
    const res = await infoList(user);
    const menuSelfList = await menuByMySelfList(user);

    const isTrue = await isConcern(userObject.username, user);

    await setListingList(list.listing);
    await setUsername(list.username);
    await setInfo(res);
    await setMenuList(menuSelfList.menu_list);
    await setIsConcerned(isTrue.is_concern);
  }, []);

  useEffect(async () => {
    // console.log(info);
    await setConcernNum(info.concern_num);
    await setConcernedNum(info.concerned_num);
  }, [info])

  return (
    <>
      <div style={{marginTop: 70}}/>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>个人信息</Divider>
      <div style={{marginTop: 30}}/>
      <Row gutter={16}>
        <Col span={2}></Col>
        <Col span={4}>
          <Image width={200}
            src={info.Avatar}
          >admin</Image>
        </Col>
        <Col span={7}>
          <Card title={`账户: ${info.username}`} style={{ width: 300 }} extra={<a href="/">修改</a>}>
            <p>地址: {`${info.address}`} ——— {`${Date(info.join_time)}`}加入</p>
            <p>签名: {`${info.signature}`}</p>
          </Card>
        </Col>
        <div style={{width: '30%', height: 250}}>
          <Row gutter={16} style={{background: '#fff', paddingTop: 20, paddingBottom: 45}}>
            <Col span={3}></Col>
            <Col span={10} onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                console.log("concern")
                navigate(`/Concern/${username}`)
            }}>
              <Statistic title="关注" value={`${info.concern_num}`} />
            </Col>
            <Col span={11}  onClick={() => {
                navigate(`/Concerned/${username}`)
            }}> 
              <Statistic title=" 粉丝" value={`${info.concerned_num}`}/>
              {
                username === data.data.username ? 
                <></> :
                <Button 
                  style={{ marginTop: 16 }} 
                  type="primary"
                  // disabled={isConcerned}
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    const res = await isConcern(data.data.username, username);
                    if (res.is_concern) {
                      await cancelConcern({
                        username: data.data.username, 
                        username_concerned: info.username,
                        Avatar: data.data.Avatar,
                        Avatar_concerned: info.Avatar
                      });
                      const res_ = await infoList(username);
                      await setInfo(res_);
                      await setIsConcerned(!res.is_concern);
                      await message.success('你已经取消关注', 1);
                      return;
                    } else {
                      await addConcern({
                        username: data.data.username, 
                        username_concerned: info.username,
                        Avatar: data.data.Avatar,
                        Avatar_concerned: info.Avatar
                      });
                      const res_ = await infoList(username);
                      await setInfo(res_);
                      await setIsConcerned(!res.is_concern);
                      await message.success('关注成功', 1); 
                      return;
                    }
                  }}
                >
                  {isConcerned ? "取消关注" : "+ 关注"}
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
        <Row>
          {
            listingList.map((item) => {
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
                    <a>
                      <Meta
                        avatar={<Avatar src={item.Avatar} />}
                        title={item.title}
                        description={item.synopsis}
                      />
                    </a>
                  </Card>
                  <div style={{ height: 30 }}></div>
                </Col>
              );
            })
          }
        </Row>
      }
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>我的创作</Divider>
      {
        menuList.length === 0 ?
        <>
          <Empty description="你的菜谱列表啥都没有" style={{color: '#008c8c', fontSize: 10}}/>
          <div style={{marginTop: 40}}/>
        </> :
        <Row>
          {
            menuList.map((item) => {
              return (
                <Col span={6}
                  onClick={() => {
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
                  <div style={{ height: 30 }}></div>
                </Col>
              );
            })
          }
        </Row>
      }
    </>
  );
}