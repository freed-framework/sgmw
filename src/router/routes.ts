import Layout from '@/components/layout/Layout.vue'
import Login from '@/components/layout/Login.vue'
import NotFound from '@/components/layout/NotFound.vue'

const constantRoutes = [
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
    path: '/login',
    name: '用户登录',
    hidden: true,
    component: Login
  }
]

export default constantRoutes

const asyncRoutes = [
  {
    path: '/book',
    name: '书籍',
    component: Layout,
    meta: { role: [ 'book' ] },
    children: [{
      path: '',
      name: '列表',
      component: () => import('@/views/book/index.vue'),
      meta: { role: [ 'book' ] },
    }, {
      path: 'detail',
      name: '详情',
      component: () => import('@/views/book/index.vue'),
      meta: { role: [ 'book' ] },
    }]
  },{
    path: '/distributor',
    name: '经销商自建线索',
    component: Layout,
    meta: { role: [ 'distributor' ] },
    children: [{
      path: 'inspection',
      name: '列表',
      component: () => import('@/views/distributor/inspection/inspectionList.vue'),
      meta: { role: [ 'distributor' ] },
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
