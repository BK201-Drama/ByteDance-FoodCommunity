import React, { useEffect, useRef, useState } from "react";
import { Form, Input, InputNumber, Button, Row, Col, Space, Select, Upload, Divider, Avatar, notification } from 'antd';
import UploadPic from "./components/upload";
import { MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import { tagList } from '../../api/tag';
import { addMenu } from '../../api/menu';
import { uploadPic } from "../../api/upload";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function Debounce (fn) {
  const dur = 1500;
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
        fn.apply(this, arguments)
    }, dur);
  }
}

export default function AddMenu () {
  

  const [form] = Form.useForm();
  const [menuPic, setMenuPic] = useState('');
  const [tag, setTag] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [url, setUrl] = useState([]);
  const navigate = useNavigate();

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onFinish = async (values) => {
    const data = JSON.parse(window.sessionStorage.getItem("store"));

    const username = data.data.username;
    console.log(data)
    console.log(values);
    console.log("menu_pic", menuPic);

    const Classification = values.classification;

    const mac = tag.filter((item) => {
      return item.classify_name === Classification
    })

    const practice_ = url.map((item, index) => {
      let idx = index + 1;
      return {
        step: idx,
        step_info: values.practice[index].step_info,
        step_pic: item
      }
    });
    
    const res = await addMenu({
      username: username,
      title: values.title,
      menu_pic: menuPic,
      synopsis: values.synopsis,
      material: values.material,
      practice: practice_,
      classification: mac,
      Tips: values.Tips
    });
    console.log(res);
    if (res) {
      navigate('/');
      notification.open({
        message: '????????????',
        description: '????????????????????????????????????'
      });
    }
  };

  const onChange = async ({ fileList: newFileList }) => {
    await setFileList(() => [...fileList, ...newFileList]);
  };

  useEffect(async () => {
    console.log("url", url)
  }, [url])

  useEffect(async () => {
    const file = fileList[fileList.length - 1].originFileObj;
    const res = await uploadPic(file);
    await setUrl([...url, res.url]);
  }, [fileList])

  useEffect(async () => {
    const res = await tagList();
    console.log(res);
    await setTag(res);
  }, []);

  return (
    <>
      <div style={{marginTop: 70}}/>
      <div style={{width: '50%', marginLeft: '16%'}}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} 
          validateMessages={validateMessages}
          initialValues={{
            // names: [1, 2]
          }}
          form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off"
        >
          <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>????????????</Divider>
          <Form.Item name="title" label="??????????????????">
            <Input />
          </Form.Item>

          <Form.Item name="pic" label="??????????????????">
            <UploadPic getUrl={Debounce(async (input) => {
              console.log(input)
              await setMenuPic(input);
            })}/>
          </Form.Item>

          <Form.Item name={"synopsis"} label="??????????????????">
            <Input />
          </Form.Item>

          <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>????????????</Divider>

          {/* ?????????????????? */}
          <div style={{marginLeft: 150}}>
            <Form.List name="material">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label="??????"
                            name={[field.name, 'mat_name']}
                            rules={[{ required: true, message: 'Missing sight' }]}
                          >
                            <Input />
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="??????"
                        name={[field.name, 'mat_weight']}
                        rules={[{ required: true, message: 'Missing price' }]}
                      >
                        <Input />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width: 200, marginLeft: 50}}>
                      ??????????????????
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Divider orientation="left" style={{ color: "#008c8c", fontSize: 30 }}>????????????</Divider>

          {/* ???????????????????????? */}
          <div style={{marginLeft: 100}}>
            <Form.List name="practice">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label="????????????"
                            name={[field.name, 'step_info']}
                            rules={[{ required: true, message: 'Missing sight' }]}
                          >
                            <TextArea rows={4}/>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="??????"
                        name={[field.name, 'step_pic']}
                        rules={[{ required: true, message: 'Missing price' }]}
                      >
                        <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          fileList={fields.length < fileList.length ? [fileList[fields.length]] : []}
                          onChange={onChange}
                          onPreview={onPreview}
                        >
                          {field.key >= fileList.length ? '??????' : <Avatar src={url[field.key]}></Avatar>}
                        </Upload>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width: 200, marginLeft: 50}}>
                      ??????????????????
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item name={"classification"} label="????????????">
            <Select defaultValue={tag.length > 0 ? tag[0].classify_name : ''}>
              {
                tag.map((item) => {
                  return (
                    <Option value={`${item.classify_name}`}>{`${item.classify_name}`}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item name={"Tips"} label="?????????">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              ????????????
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}