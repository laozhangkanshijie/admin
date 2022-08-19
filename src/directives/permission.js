import store from '@/store'

function checkpermission(el, binding) {
  // 获取对应的权限
  const { value } = binding
  // 获取到当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  // value 必须是一个数组
  if (value && value instanceof Array) {
    const hasPermission = points.some(point => {
      return value.includes(point)
    })

    // 匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is["admin","editor"]')
  }
}

export default {
  mounted(el, binding) {
    checkpermission(el, binding)
  },
  update(el, binding) {
    checkpermission(el, binding)
  }
}
