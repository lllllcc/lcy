//常量路由
export const constanroutes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      hidden: true
    }
  },
  //登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hidden: true
    },
    component: () => import('@/views/login/index.vue')
  },
  //首页
  {
    path: '/layout',
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: ''
    },
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'House'
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  //数据大屏
  {
    path: '/screen',
    name: 'screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform'
    },
    component: () => import('@/views/screen/index.vue')
  },
  //权限管理
  {
    path: '/acl',
    name: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      icon: 'Lock',
      title: '权限管理'
    },
    redirect: '/permission',
    children: [
      {
        path: '/permission',
        name: 'permission',
        meta: {
          hidden: false,
          icon: 'List',
          title: '菜单管理'
        },
        component: () => import('@/views/acl/permission/index.vue')
      },
      {
        path: '/roler',
        name: 'roler',
        meta: { hidden: false, title: '角色管理', icon: 'Avatar' },
        component: () => import('@/views/acl/roler/index.vue')
      },
      {
        path: '/user',
        name: '/user',
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User'
        },
        component: () => import('@/views/acl/user/index.vue')
      }
    ]
  },
  //产品介绍
  {
    path: '/product',
    name: 'product',
    meta: {
      hidden: false,
      title: '产品管理',
      icon: 'MilkTea'
    },
    component: () => import('@/layout/index.vue'),
    redirect: '/attr',
    children: [
      {
        path: '/attr',
        name: 'attr',
        meta: {
          hidden: false,
          title: '属性管理',
          icon: 'Bowl'
        },
        component: () => import('@/views/product/attr/index.vue')
      },
      {
        path: '/sku',
        name: 'sku',
        meta: {
          hidden: false,
          title: 'sku管理',
          icon: 'IceTea'
        },
        component: () => import('@/views/product/sku/index.vue')
      },
      {
        path: '/spu',
        name: 'spu',
        meta: {
          hidden: false,
          title: 'spu管理',
          icon: 'ForkSpoon'
        },
        component: () => import('@/views/product/spu/index.vue')
      },
      {
        path: '/trademark',
        name: 'trademark',
        meta: {
          hidden: false,
          title: '品牌管理',
          icon: 'Goblet'
        },
        component: () => import('@/views/product/trademark/index.vue')
      }
    ]
  },
  //错误
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true
    },
    component: () => import('@/views/404/index.vue')
  },
  //任意路由
  {
    path: '/:pathmatch(.*)*', //一种匹配方法
    redirect: '/404', //修改路径的
    name: 'any',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]
