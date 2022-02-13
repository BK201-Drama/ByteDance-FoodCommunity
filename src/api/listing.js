import http from './http'

export async function listing (username) {
  const {data: res} = await http.get(`/Listing?username=${username}`);
  return res;
}

export async function addListing (username, menu_id) {
  const {data: res} = await http.post('/Listing', {
    username,
    menu_id
  });
  return res;
}

export async function deleteListing (username, menu_id) {
  const {data: res} = await http.delete('/Listing', {
    username,
    menu_id
  });
  return res;
}

export async function isListed (username, menu_id) {
  const {data: res} = await http.get(`/isList?username=${username}&menu_id=${menu_id}`);
  return res;
}