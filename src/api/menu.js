import http from './http';

export async function addMenu (menuObj) {
  const {data: res} = await http.post('/addMenu', menuObj);
  return res;
}

export async function deleteMenu (username, menu_id) {
  const {data: res} = await http.post('/deleteMenu', {
    username,
    menu_id
  });
  return res;
}

export async function updateMenu (menuObj) {
  const {data: res} = await http.post('/updateMenu', menuObj);
  return res;
}

export async function likeMenu (username, menu_id, like_num) {
  const {data: res} = await http.post('/like', {
    username,
    menu_id,
    like_num
  });
  return res;
}

export async function getMenuById (menu_id) {
  const {data: res} = await http.get(`/menu/${menu_id}`);
  return res;
}

export async function getAvatar (username) {
  const {data: res} = await http.get(`/avatar?username=${username}`);
  return res;
}