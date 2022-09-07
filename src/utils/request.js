// 下载 yarn add axios
// 引入axios并配置axios
import axios from 'axios'

// axios.create() 克隆axios 需要的base会不一样
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
