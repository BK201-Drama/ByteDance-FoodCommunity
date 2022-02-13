import http from './http';

export async function concernList (username) {
  const {data: res} = await http.get(`/concern?username=${username}`);
  return res;
}

export async function concernedList (username) {
  const {data: res} = await http.get(`/concerned?username=${username}`);
  return res;
}

export async function addConcern (infoObj) {
  const {data: res} = await http.patch('/addConcern', infoObj);
  return res;
}

export async function cancelConcern (infoObj) {
  const {data: res} = await http.patch('/cancelConcern', infoObj);
  return res;
}

export async function isConcern (username, username_concerned) {
  const {data: res} = await http.patch('/isConcern', {
    username,
    username_concerned
  });
  return res;
}