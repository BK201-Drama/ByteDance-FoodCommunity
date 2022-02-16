import axios from 'axios';

// 添加进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置前部分url，后续的url都会与它拼接
axios.defaults.baseURL = 'https://bk201-drama.app.cloudendpoint.cn/api';

// 是否为登录状态，不是就来登录获得token
// 请求拦截
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
// 响应拦截
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

export default axios;