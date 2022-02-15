import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { menuTagList } from '../../api/list';
import { tagList } from '../../api/tag';

export default function TagPage () {

  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  
  useEffect(async () => {
    const res = await menuTagList('小吃');
    console.log(res);
    const list = await tagList();
    // console.log(list)
    setTags(list);
  }, []);

  return (
    <>
      <div style={{marginTop: 70}}/>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>菜谱一览</Divider>
      <Row style={{width: '60%', marginLeft: '22%', marginTop: '3%'}}>
        {
          tags.length > 0 ? 
          tags.map((item) => {
            return (
              <Col span={6} style={{marginBottom: 15}}>
                <a 
                  style={{fontSize: 35}}
                  onClick={() => {
                    navigate(`/TagPage/${item.classify_name}`);
                  }}
                >{item.classify_name}</a>
              </Col>
            )
          }) :
          <></>
        }
      </Row>
      <div style={{marginTop: 70}}/>
    </>
  );
}