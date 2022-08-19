import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        filterRoutes.forEach(item => [
          router.addRoute(item)
        ])
        // 添加完动态路由子后，需要进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
