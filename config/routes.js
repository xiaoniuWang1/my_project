export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'systemAdmin',
    icon: 'SettingOutlined',
    path: '/systemAdmin',
    routes: [
      {
        name: 'organizationManage',
        path: '/systemAdmin/organization/organizationManage',
        component: './systemAdmin/organization/organizationManage',
      },
      {
        name: 'jobManage',
        path: '/systemAdmin/job/jobManage',
        component: './systemAdmin/job/jobManage',
      },
      {
        name: 'stationManage',
        path: '/systemAdmin/station/stationManage',
        component: './systemAdmin/station/stationManage',
      },
      {
        name: 'userManage',
        path: '/systemAdmin/user/userManage',
        component: './systemAdmin/user/userManage',
      },
    ]
  },
  {
    name: 'menuPower',
    icon: 'SettingOutlined',
    path: '/menuPower',
    routes: [
      {
        name: 'roleManage',
        path: '/menuPower/role/roleManage',
        component: './menuPower/role/roleManage'
      },
      {
        name: 'menuManage',
        path: '/menuPower/menu/menuManage',
        component: './menuPower/menu/menuManage'
      },
      {
        name: 'permissionsManage',
        path: '/menuPower/permissions/permissionsManage',
        component: './menuPower/permissions/permissionsManage'
      },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
