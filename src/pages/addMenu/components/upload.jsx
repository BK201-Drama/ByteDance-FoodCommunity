import React, { useState, useEffect } from 'react';
import { Upload, Form } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  uploadPic
} from '../../../api/upload';

function Debounce (fn) {
  const dur = 100;
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
        fn.apply(this, arguments)
    }, dur);
  }
}

const UploadPic = (props) => {
  const [fileList, setFileList] = useState([]);
  const [url, setUrl] = useState('');

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  useEffect(async () => {
    if (fileList.length === 0) {
      return;
    }
    const file = fileList[0];

    if (file.status === 'done') {
      const res = await uploadPic(file.originFileObj);
      setUrl(res.url);
    }
  }, [fileList])

  return (
    <Form>
      <Form.Item>
        <ImgCrop 
          rotate
        >
          <Upload
            action="https://bk201-drama.app.cloudendpoint.cn/api/upload"
            beforeUpload={uploadPic}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            alt={url}
            ref={input => Debounce(props.getUrl(url))}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </Form.Item>
    </Form>
  );
};

export default UploadPic;