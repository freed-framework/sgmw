export const tabelHeader = {
  // 物流商
  '3': [
    {
      title: '角色代码',
      key: 'id'
    },
    {
      title: '角色名称',
      key: 'name'
    },
    {
      title: '描述',
      key: 'description'
    },
    {
      title: '状态',
      key: 'activeText'
    },
    {
      title: '用户类型',
      key: 'userTypeName'
    }
  ],
  // 经销商
  '2': [
    {
      title: '操作员代码',
      key: 'id'
    },
    {
      title: '经销商号',
      key: 'deptNo'
    },
    {
      title: '操作员名称',
      key: 'name'
    },
    {
      title: '登录名',
      key: 'loginName'
    },
    {
      title: '职务',
      key: 'position'
    },
    {
      title: '注册时间',
      key: 'registDate'
    },
    {
      title: '用户类型',
      key: 'userTypeName'
    },
    {
      title: '状态',
      key: 'activeText'
    }
  ],
  // 厂家操作员管理
  '1': [
    {
      title: '部门编号',
      key: 'deptNo'
    },
    {
      title: '操作员代码',
      key: 'code'
    },
    {
      title: '操作员名称',
      key: 'name'
    },
    {
      title: '登录名',
      key: 'loginName'
    },
    {
      title: '用户类型',
      key: 'userTypeName'
    },
    {
      title: '状态',
      key: 'activeText'
    },
    {
      title: '职务',
      key: 'position'
    },
    {
      title: '大区',
      key: 'region'
    },
    {
      title: '注册时间',
      key: 'registDate'
    },
    {
      title: '注销时间',
      key: 'cancelDate'
    },
    {
      title: '联系手机',
      key: 'phone'
    }
  ]
}

export default function getHeader(userType) {
  return tabelHeader[1].map((item) => {
    if (item.key === 'deptNo') {
      if (userType === 2) {
        item.title = '经销商号'
      }
      if (userType === 3) {
        item.title = '物流商号'
      }
    }

    return item
  })
}
