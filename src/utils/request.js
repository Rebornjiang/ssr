import axios from 'axios'


// 服务端的接口网关或者鉴权方式可能与客户端不一定相同，也需需要重新专门定制服务端 axios 
const service = axios.create({
  baseURL: 'https://cnodejs.org/' // test
})

// service.interceptors.request.use()
// service.interceptors.response.use()

export default service