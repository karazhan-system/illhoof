import Vue from 'vue'
import App from '@/modules/App.vue'
import { router } from '@/commons/route'

import '@/assets/icon/iconfont.css'
import '@/assets/css/global.styl'
import '@/components'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
