import React, { useEffect, useRef, useState } from "react";
import { Form, Input, InputNumber, Button, Row, Col, Space, Select, Upload } from 'antd';
import UploadPic from "./components/upload";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { tagList } from '../../api/tag';

const { Option } = Select;

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

  const onFinish = (values) => {
    console.log(values);
    console.log("menu_pic", menuPic);
  };

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
          <Form.Item name="username" label="添加菜谱名称">
            <Input />
          </Form.Item>

          <Form.Item name="pic" label="上传">
            <UploadPic getUrl={Debounce(async (input) => {
              console.log(input)
              await setMenuPic(input);
            })}/>
          </Form.Item>

          <Form.Item name={"synopsis"} label="添加菜谱描述">
            <Input />
          </Form.Item>

          {/* 追加一行用料 */}
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
                          label="食材"
                          name={[field.name, 'mat_name']}
                          rules={[{ required: true, message: 'Missing sight' }]}
                        >
                          <Input />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="用量"
                      name={[field.name, 'mat_weight']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    追加一行用料
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

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
                          label="菜谱步骤"
                          name={[field.name, 'step_info']}
                          rules={[{ required: true, message: 'Missing sight' }]}
                        >
                          <Input />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="步骤图片"
                      name={[field.name, 'step_pic']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    追加一行步骤
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
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

          <Form.Item name={"Tips"} label="小贴士">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          
        </Form>
      </div>
    </>
  )
}