import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'

import installElementPlus from './plugins/element'
import installIcons from '@/icons'

// 初始化样式表
import '@/styles/index.scss'

// 导入路由鉴权
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).use(i18n).mount('#app')
