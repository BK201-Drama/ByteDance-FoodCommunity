import http from './http';

export async function tagList () {
  const {data: res} = await http.get('/tagList');
  return res;
}