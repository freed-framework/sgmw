import Layout from '@/components/layout/Layout.vue'
import Login from '@/components/layout/Login.vue'
import NotFound from '@/components/layout/NotFound.vue'

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      meta: { text: '首页' },
      component: () => import('@/views/home/index.vue')
    }]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

export default constantRoutes

const asyncRoutes = [
  {
    path: '/book',
    component: Layout,
    meta: {
      role: [ 'book' ],
      text: 'Book'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/book/index.vue'),
      meta: {
        role: [ 'book' ],
        text: 'Book List'
      },
    }, {
      path: 'detail',
      component: () => import('@/views/book/index.vue'),
      meta: {
        role: [ 'book' ],
        text: 'Book Detail'
      },
    }]
  },
  {
    path: '/customerManagement',
    component: Layout,
    meta: {
      role: [ 'book' ]
    },
    children: [{
      path: '',
      component: () => import('@/views/kpi/customerManagement/index.vue'),
      meta: {
        text: '客户管理关键KPI',
        role: [ 'admin' ]
      }
    }]
  },
  {
    path: '/404',
    hidden: true,
    component: NotFound
  },
  {
    path: '*',
    hidden: true,
    redirect: '/404'
  }
]

export {
  asyncRoutes,
  constantRoutes,
}

/*
export default [
  {
    path: '/',
    name: '首页',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/home/index.vue')
    }]
  },
  {
    path: '/book',
    name: 'Book',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/book/index.vue')
    }]
  },
  {
    path: '/customerManagement',
    name: '客户管理关键KPI',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/kpi/customerManagement/index.vue')
    }]
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: NotFound
  },
  {
    path: '*',
    hidden: true,
    redirect: '/404'
  }
]
*/
