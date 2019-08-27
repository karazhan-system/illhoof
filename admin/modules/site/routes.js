import { parseRoutes } from '@/commons/route.js'

// Layout Components
import MainLayout from '@/layouts/MainLayout'

// Module Components
import Home from './Home'

export default parseRoutes([
  {
    path: '/site',
    redirect: '/site/home',
    children: [
      {
        path: '/site/home',
        layout: MainLayout,
        component: Home,
      }
    ]
  },
])