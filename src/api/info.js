import http from './http';

export async function infoList (username) {
  const {data: res} = await http.get(`/info?username=${username}`);
  return res;
}

export async function menuByMySelfList (username) {
  const {data: res} = await http.get(`/menu?username=${username}`);
  return res;
}

export async function patchInfo (object) {
  const {data: res} = await http.patch('/info', object);
  return res;
}