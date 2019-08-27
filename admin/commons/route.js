import Vue from 'vue'
import Router from 'vue-router'

import common from '@/modules/common/routes.js'
import server from '@/modules/server/routes.js'
import site from '@/modules/site/routes.js'

Vue.use(Router)

const router = new Router()

router.addRoutes(common)
router.addRoutes(server)
router.addRoutes(site)

router.beforeEach((to, from, next) => {
  next()
})

// 解析路由配置，将树形配置数据摊平
function parseRoutes (routes = []) {
  return routes.reduce((result, route) => {
    const { path, layout, children, ...rest } = route
    const name = path.split('/').map(str => str.replace(str.charAt(0), str.charAt(0).toUpperCase())).join('')
    const selfRoute = { 
      path, 
      component: layout, 
      children: [
        { 
          path: '', 
          name, 
          ...rest 
        }
      ] 
    }
    const subRoutes = parseRoutes(children)
    const parsedRoutes = [selfRoute].concat(subRoutes)
    return [].concat(result, parsedRoutes)
  }, [])
}

export {
  parseRoutes,
  router
}