import { parseRoutes } from '@/commons/route.js'

// Layout Components
import MainLayout from '@/layouts/MainLayout'

// Module Components
import Home from './Home'

export default parseRoutes([
  {
    path: '/server',
    redirect: '/server/home',
    children: [
      {
        path: '/server/home',
        layout: MainLayout,
        component: Home,
      }
    ]
  },
])