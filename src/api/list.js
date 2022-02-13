import http from './http';

export async function menuList () {
  const {data: res} = await http.get('/menuList');
  return res;
}

export async function menuTagList (classify_name) {
  const res = await http.get(`/menuTagList?classify_name=${classify_name}`);
  return res;
}