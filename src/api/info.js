import http from './http';

export async function infoList (username) {
  const {data: res} = await http.get(`/info?username=${username}`);
  return res;
}