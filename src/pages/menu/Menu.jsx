import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { getMenuById } from '../../api/menu';

export default function Menu () {

  const [menuId, setMenuId] = useState('');
  const [menuInfo, setMenuInfo] = useState({});

  useEffect(async () => {
    let str = window.location.href;
    const idArr = str.split('/');
    const id = idArr[idArr.length - 1];
    await setMenuId(id);

    const res = await getMenuById(id);
    console.log(res);
    await setMenuInfo(res);
  }, [])

  return (
    <>
      <div style={{marginTop: 70}}/>
      <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>创建人</Divider>
      
    </>
  )
}