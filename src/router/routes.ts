/* eslint-disable */
import Layout from '@/components/layout/Layout.vue'
import Login from '@/components/layout/Login.vue'
import NotFound from '@/components/layout/NotFound.vue'

const constantRoutes = [
  {
    path: '/',
    // component: Layout,
    hidden: true,
    redirect: '/management/users',
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
  {
    path: '/management',
    key: 'management',
    component: Layout,
    meta: {
      // role: ['management'],
      text: '管理'
    },
    children: [
      // {
      //   path: 'permissions',
      //   component: () => import('@/views/management/Permissions.vue'),
      //   meta: {
      //     role: ['permissions'],
      //     text: '权限管理'
      //   }
      // },
      {
        path: 'users',
        component: () => import('@/views/management/Users.vue'),
        meta: {
          role: ['users'],
          text: '用户管理'
        }
      },
      {
        path: 'roles',
        component: () => import('@/views/management/Roles.vue'),
        meta: {
          role: ['roles'],
          text: '角色管理'
        }
      }
    ]
  },
  {
    path: '/customerManagement',
    component: Layout,
    key: 'customerManagement',
    meta: {
      // role: ['kpi_menu']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/kpi/customerManagement/index.vue'),
        meta: {
          text: '客户管理关键KPI',
          role: ['kpi']
        }
      }
    ]
  }, {
    path: '/distributor',
    name: '查询统计',
    component: Layout,
    meta: {
      // role: ['distributor'],
      text: '查询统计'
    },
    children: [
      {
        path: 'inspectionSystem',
        name: '经销商自建线索',
        component: () => import('@/views/distributor/inspectionSystem/index.vue'),
        meta: {
          role: ['inspectionSystem'],
          text: '经销商自建线索'
        },
      },
      {
        path: 'salesStatistics',
        name: '销量统计',
        component: () => import('@/views/distributor/salesStatistics/index.vue'),
        meta: {
          role: ['salesStatistics'],
          text: '销量统计'
        },
      },
      {
        path: 'subStatistics',
        name: '潜客统计',
        component: () => import('@/views/distributor/subStatistics/index.vue'),
        meta: {
          role: ['subStatistics'],
          text: '潜客统计'
        },
      },
      {
        path: 'trafficStatistics',
        name: '发车统计',
        component: () => import('@/views/distributor/trafficStatistics/index.vue'),
        meta: {
          role: ['trafficStatistics'],
          text: '发车统计'
        },
      },
      {
        path: 'shopCustomers',
        name: '到店统计',
        component: () => import('@/views/distributor/shopCustomers/index.vue'),
        meta: {
          role: ['shopCustomers'],
          text: '到店统计'
        },
      },
      {
        path: 'defeatCustomer',
        name: '战败客户统计',
        component: () => import('@/views/distributor/defeatCustomer/index.vue'),
        meta: {
          role: ['defeatCustomer'],
          text: '战败客户统计'
        },
      },
      {
        path: 'customerStatistics',
        name: '客户统计',
        component: () => import('@/views/distributor/customerStatistics/index.vue'),
        meta: {
          role: ['customerStatistics'],
          text: '客户统计'
        },
      },
      {
        path: 'finalInventStatist',
        name: '期末库存统计',
        component: () => import('@/views/distributor/finalInventStatist/index.vue'),
        meta: {
          role: ['finalInventStatist'],
          text: '期末库存统计'
        },
      },
      {
        path: 'diveCusClue',
        component: () => import('@/views/diveCustomers/diveCusClue/index.vue'),
        meta: {
          text: '厂家潜客线索',
          role: [ 'diveCusClue' ]
        }
      },
    ]
  },
  {
    path: '/diveCustomers',
    key: 'diveCustomers',
    component: Layout,
    meta: { 
      // role: [ 'dive' ],
      // role: [ 'diveCustomers' ],
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
          text: '销售顾问工作量',
          role: [ 'salerWorkNum' ]
        }
      },{
        path: 'buyerIntention',
        component: () => import('@/views/diveCustomers/buyerIntention/index.vue'),
        meta: {
          text: '潜在客户购买意向分析',
          role: [ 'buyerIntention' ]
        }
      },{
        path: 'feature',
        component: () => import('@/views/diveCustomers/feature/index.vue'),
        meta: {
          text: '潜在客户特征分析',
          role: [ 'feature' ]
        }
      }
    ]
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
