import Layout from '@/components/layout/Layout.vue'
import NotFound from '@/components/layout/NotFound.vue'

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
    path: '/diveCustomers',
    name: '潜在客户线索',
    component: Layout,
    children: [{
      path: 'diveCusClue',
      component: () => import('@/views/diveCustomers/diveCusClue/index.vue')
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
