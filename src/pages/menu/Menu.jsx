import React, { useState, useEffect } from 'react';
import { Divider, Button, Image, Col, Row, Table, Tag, Space, Comment, Tooltip, Avatar, Input, Form, List, Editor, message, Empty } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { 
  getMenuById,
  getAvatar
} from '../../api/menu';

import {
  addComment,
  showCommentListById
} from '../../api/comment';

const { TextArea } = Input;

const columns = [
  {
    title: '用料名称',
    dataIndex: 'mat_name',
    key: 'mat_name'
  },
  {
    title: '用量',
    dataIndex: 'mat_weight',
    key: 'mat_weight',
  }
];

export default function Menu () {

  const [menuId, setMenuId] = useState('');
  const [menuInfo, setMenuInfo] = useState({});
  const [dat, setDat] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  const onFinish = async (values) => {
    await addComment({
      username: menuInfo.username,
      Avatar: avatar,
      menu_id: menuInfo.menu_id,
      comment: values.comment
    })

    const list = await showCommentListById(menuInfo.menu_id);
    if (list) {
      await setCommentList(list.comments);
      message.success('评论成功', 1);
    }
  }

  useEffect(async () => {

    let str = window.location.href;
    const idArr = str.split('/');
    
    const id = idArr[idArr.length - 1];
    const res = await getMenuById(id);
    const com_list = await showCommentListById(id);
    const AVA = await getAvatar(res.username);

    await setMenuId(id);
    await setMenuInfo(res);
    await setCommentList(com_list.comments);
    await setAvatar(AVA.Avatar);
  }, []);

  useEffect(async () => {
    const req = await menuInfo.material.map((item, index) => {
      return {
        key: `${index}`,
        mat_name: item.mat_name,
        mat_weight: item.mat_weight
      }
    })
    await setDat(req);
  }, [menuInfo]);

  return (
    <>
      <div style={{marginTop: 70}}/>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>菜谱名</Divider>
      <Row>
        <Col style={{ color: "#008c8c", fontSize: 40, marginLeft: '15%', marginTop: '10%', marginBottom: 60 }}>
          {menuInfo.title}
        </Col>
        <Col style={{ color: "#008c8c", fontSize: 40, marginLeft: '20%', marginTop: 25, marginBottom: 60 }}>
          {
            <Image
              width={350}
              src={menuInfo.menu_pic}
            />
          }
        </Col>
      </Row>

      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>创建人</Divider>
      <Row style={{marginLeft: '20%', marginTop: 40, marginBottom: 60}}>
        <Col>
          <Image
            width={100}
            src={menuInfo.menu_pic}
            preview={false}
            onClick={() => {navigate(`/myZone/${menuInfo.username}`)}}
          />
        </Col>
        <Col style={{marginLeft: '20%', marginTop: 25, color: '#008c8c', fontSize: 20}}>
          账户: {menuInfo.username}
        </Col>
      </Row>

      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>简述</Divider>
      <Col style={{marginLeft: '20%', marginTop: 25, color: '#008c8c', fontSize: 20}}>
        {menuInfo.synopsis}
      </Col>

      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>用料</Divider>
      <Table columns={columns} dataSource={dat} style={{marginLeft: '30%', marginRight: '30%', marginTop: 70, marginBottom: 50 }} pagination={false}/>

      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>{menuInfo.title}的做法</Divider>
      {
        menuInfo.practice ?
        menuInfo.practice.map((item) => {
          return (
            <Row>
              <Col style={{ color: "#DAA520", fontSize: 40, marginLeft: '15%', marginTop: '2%', marginBottom: 60 }}>
              {item.step}
              </Col>
              <Col style={{ color: "#8B4513", fontSize: 20, marginLeft: '5%', marginTop: '4%', marginBottom: 60 }} span={6}>
                {item.step_info}
              </Col>
              <Col style={{ color: "#008c8c", marginLeft: '14%', marginTop: 25, marginBottom: 60 }}>
                {
                  <Image
                    width={350}
                    src={item.step_pic}
                  />
                }
              </Col>
            </Row>
          );
        }) : <></>
      }

      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>评论列表</Divider>
      <div style={{width: '60%', marginLeft: '20%'}}>
      {
        commentList ?
        commentList.map((item) => {
          return <>
            <Comment
              actions={[]}
              author={<a onClick={() => {navigate(`/myZone/${item.username}`)}}>{item.username}</a>}
              avatar={<Avatar src={item.Avatar} alt="Han Solo" onClick={() => {navigate(`/myZone/${item.username}`)}}/>}
              content={
                <p>{item.comment_content}</p>
              }
            />
          </>
        }) : <Empty description="没人评论，抢沙发吧！" style={{marginBottom: '5%', color: '#008c8c'}}/>
      }
      </div>

      <Comment
        style={{width: '60%', marginLeft: '20%'}}
        avatar={<Avatar src={avatar} alt="Han Solo" />}
        content={
          <Form
            onFinish={onFinish}
          >
            <Form.Item name="comment">
              <TextArea rows={4} placeholder="写下你想询问的"/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                添加评论
              </Button>
            </Form.Item>
          </Form>
        }
      />
      <div style={{marginTop: 70}}/>
    </>
  )
}