import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAlllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true, // 单独模块
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token)
            // 跳转
            router.push('/')
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo() {
      const data = await getUserInfo()
      this.commit('user/setUserInfo', data)
      return data
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAlllItem()
      // TODO 清理掉权限相关的配置
      router.push('/login')
    }
  }
}
