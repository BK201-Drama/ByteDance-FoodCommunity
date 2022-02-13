import http from './http'

export async function listing (username) {
  const {data: res} = await http.get(`/Listing?username=${username}`);
  return res;
}