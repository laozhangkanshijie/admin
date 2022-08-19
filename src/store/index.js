import { createStore } from 'vuex'
import user from './modules/user.js'
import app from './modules/app.js'
import theme from '@/store/modules/theme'
import permission from './modules/permission.js'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
})
