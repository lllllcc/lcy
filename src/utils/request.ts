import axios from 'axios'
const request = axios.create({
  baseURL: import.meta.env.VITE_SERVE, // 'https://mock.apifox.com/m1/3613229-0-default', //默认路径
  timeout: 50000 //超时时间
})
// console.log(import.meta.env)

//添加拦截器
request.interceptors.request.use((config) => {
  //获取用户相关的信息，并把token带给服务器
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token //请求头中没有token，只有authorization
  }
  return config
  //config是数据
})
//添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    const status = error.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器问题'
        break
      default:
        message = '网络问题'
    }
    return message
  }
)
export default request
