import http from './http';

export async function login (username, password) {
  const {data: res} = await http.post('/login', {
    username,
    password
  });

  return res;
}

export async function sign (username, password) {
  const {data: res} = await http.post('/sign', {
    username,
    password
  });
  return res;
}