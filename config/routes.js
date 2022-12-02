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
      // {
      //   name: 'role-admin',
      //   path: '/systemAdmin/role-admin',
      //   component: './systemAdmin/role-admin',
      // },
      // {
      //   name: 'user-admin',
      //   path: '/systemAdmin/user-admin',
      //   component: './systemAdmin/user-admin',
      // },
      // {
      //   name: 'object-admin',
      //   path: '/systemAdmin/object-admin',
      //   component: './systemAdmin/object-admin',
      // },
      // {
      //   name: 'bm-admin',
      //   path: '/systemAdmin/bm-admin',
      //   component: './systemAdmin/bm-admin',
      // },
      // {
      //   name: 'filesUpload',
      //   path: '/systemAdmin/filesUpload',
      //   component: './systemAdmin/filesUpload',
      // },
      // {
      //   name: 'tokenQuery',
      //   path: '/systemAdmin/tokenQuery',
      //   component: './systemAdmin/tokenQuery',
      // },
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
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
