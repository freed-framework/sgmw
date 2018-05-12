/* eslint-disable */
import Layout from '@/components/layout/Layout.vue'
import Login from '@/components/layout/Login.vue'
import NotFound from '@/components/layout/NotFound.vue'

const constantRoutes = [
  {
    path: '/',
    // component: Layout,
    hidden: true,
    redirect: '/distributor/inspectionSystem',
    // children: [{
    //   path: '',
    //   meta: { text: '首页' },
    //   component: () => import('@/views/home/index.vue')
    // }]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

export default constantRoutes

const asyncRoutes = [
  // {
  //   path: '/book',
  //   component: Layout,
  //   meta: {
  //     role: ['book'],
  //     text: 'Book'
  //   },
  //   children: [{
  //     path: 'list',
  //     component: () => import('@/views/book/index.vue'),
  //     meta: {
  //       role: ['book_list'],
  //       text: 'Book List'
  //     },
  //   }, {
  //     path: 'detail',
  //     component: () => import('@/views/book/index.vue'),
  //     meta: {
  //       role: ['book_detail'],
  //       text: 'Book Detail'
  //     },
  //   }]
  // },
  // {
  //   path: '/management',
  //   component: Layout,
  //   meta: {
  //     role: ['admin'],
  //     text: '管理'
  //   },
  //   children: [
  //     {
  //       path: 'role',
  //       component: () => import('@/views/management/Role.vue'),
  //       meta: {
  //         role: ['admin', 'role'],
  //         text: '权限管理'
  //       }
  //     },
  //     {
  //       path: 'level',
  //       component: () => import('@/views/management/Level.vue'),
  //       meta: {
  //         role: ['admin', 'level'],
  //         text: '角色管理'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/customerManagement',
    component: Layout,
    meta: {
      role: ['admin']
    },
    children: [{
      path: '',
      component: () => import('@/views/kpi/customerManagement/index.vue'),
      meta: {
        text: '客户管理关键KPI',
        role: ['admin']
      }
    }]
  }, {
    path: '/distributor',
    name: '查询统计',
    component: Layout,
    meta: {
      // role: ['distributor'],
      role: ['admin'],
      text: '查询统计'
    },
    children: [{
      path: 'inspectionSystem',
      name: '经销商自建线索',
      component: () => import('@/views/distributor/inspectionSystem/index.vue'),
      meta: {
        role: ['admin'],
        text: '经销商自建线索'
      },
    }, {
      path: 'salesStatistics',
      name: '销量统计',
      component: () => import('@/views/distributor/salesStatistics/index.vue'),
      meta: {
        role: ['salesStatistics'],
        text: '销量统计'
      },
    }, {
      path: 'subStatistics',
      name: '潜客统计',
      component: () => import('@/views/distributor/subStatistics/index.vue'),
      meta: {
        role: ['subStatistics'],
        text: '潜客统计'
      },
    }, {
      path: 'trafficStatistics',
      name: '发车统计',
      component: () => import('@/views/distributor/trafficStatistics/index.vue'),
      meta: {
        role: ['trafficStatistics'],
        text: '发车统计'
      },
    }, {
      path: 'shopCustomers',
      name: '到店客户统计',
      component: () => import('@/views/distributor/shopCustomers/index.vue'),
      meta: {
        role: ['admin'],
        text: '到店客户统计'
      },
    }, {
      path: 'defeatCustomer',
      name: '战败客户统计',
      component: () => import('@/views/distributor/defeatCustomer/index.vue'),
      meta: {
        role: ['defeatCustomer'],
        text: '战败客户统计'
      },
    }, {
      path: 'customerStatistics',
      name: '客户统计',
      component: () => import('@/views/distributor/customerStatistics/index.vue'),
      meta: {
        role: ['customerStatistics'],
        text: '客户统计'
      },
    }, {
      path: 'finalInventStatist',
      name: '期末库存统计',
      component: () => import('@/views/distributor/finalInventStatist/index.vue'),
      meta: {
        role: ['kpi'],
        text: '期末库存统计'
      },
    },
      {
        path: 'diveCusClue',
        component: () => import('@/views/diveCustomers/diveCusClue/index.vue'),
        meta: {
          role: [ 'admin' ],
          text: '厂家潜客线索'
        }
      },
    ]
  },
  {
    path: '/diveCustomers',
    component: Layout,
    meta: { 
      // role: [ 'dive' ],
      role: [ 'admin' ],
      text: '潜在客户管理'
    },
    children: [
      // {
      //   path: 'diveCusClue',
      //   component: () => import('@/views/diveCustomers/diveCusClue/index.vue'),
      //   meta: {
      //     role: [ 'admin' ],
      //     text: '厂家潜客线索'
      //   }
      // },
    {
      path: 'salerWorkNum',
      component: () => import('@/views/diveCustomers/salerWorkNum/index.vue'),
      meta: {
        role: [ 'salerWorkNum' ],
        text: '销售顾问工作量'
      }
    },{
      path: 'buyerIntention',
      component: () => import('@/views/diveCustomers/buyerIntention/index.vue'),
      meta: {
        // role: [ 'buyerIntention' ],
        role: [ 'admin' ],
        text: '潜在客户购买意向分析'
      }
    },{
      path: 'feature',
      component: () => import('@/views/diveCustomers/feature/index.vue'),
      meta: {
        role: [ 'admin' ],
        text: '潜在客户特征分析'
      }
    }]
  },
  {
    path: '/404',
    hidden: true,
    component: NotFound
  },
  // {
  //   path: '*',
  //   hidden: true,
  //   redirect: '/404'
  // }
]

const sourceAsync = JSON.parse(JSON.stringify(asyncRoutes))

export {
  asyncRoutes,
  constantRoutes,
  sourceAsync
}
