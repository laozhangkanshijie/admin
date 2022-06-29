import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}

// 通过路由获取title
export function getTitle(route) {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
