import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 应用element-ui组件库
Vue.use(ElementUI, {
  size: 'mini'
})

const components = [
  'CommonToolbar',
  'CommonView',
  'CommonPage',
]

components.forEach(name => {
  const component = require(`./${name}`).default
  Vue.component(component.name, component)
})
