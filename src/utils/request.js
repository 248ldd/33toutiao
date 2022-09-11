// 下载 yarn add axios
// 引入axios并配置axios
import axios from 'axios'
import store from '@/store'
// axios.create() 克隆axios 需要的base会不一样
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
// config 是每一次请求的配置对象
request.interceptors.request.use(function (config) {
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store
  if (isLogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
})
export default request
