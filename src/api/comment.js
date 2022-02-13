import http from './http';

export async function addComment (infoObj) {
  const {data: res} = await http.post('/addComment', infoObj);
  return res;
}

export async function deleteComment (infoObj) {
  const {data: res} = await http.post('/deleteComment', infoObj);
  return res;
}

export async function showCommentListById (menu_id) {
  const {data: res} = await http.get(`/commentList?menu_id=${menu_id}`);
  return res;
}