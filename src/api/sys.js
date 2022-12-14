import request from '@/utils/request'

// 登录接口
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 组册接口
export const register = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}
