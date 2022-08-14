import request from '@/utils/request'

/**
 * 获取项目功能
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    data
  })
}
