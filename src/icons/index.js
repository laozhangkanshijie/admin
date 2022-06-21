import SvgIcon from '@/components/SvgIcon' // svg component

const svgRequire = require.context('./svg', false, /\.svg$/)

svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

// 通过导出函数再在main.js中调用来进行全局注册
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
