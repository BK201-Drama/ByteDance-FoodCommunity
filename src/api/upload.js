import http from './http';

export async function uploadPic (info) {

  // 这里有一点需要我们注意：
  // 如果你是图片传输，那么请使用FormData存储为表单数据
  let formData = new FormData()
  formData.append('file', info)
  const {data: res} = await http.post(
    '/upload', formData
  , {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      "Cache-Control": "no-store"
    }
  })
  return res;
}