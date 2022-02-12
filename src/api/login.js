import http from './http';

export async function login () {
  const res = await http.post('/login', {
    username: 'admin',
    password: 'admin'
  });
  console.log(res)
  return res;
}