import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser();
      // return msg.data;
      return {
        name: 'Serati Ma1',
      };
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {!props.location?.pathname?.includes('/login') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => ({ ...preInitialState, settings }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};

// 请求拦截器
const authHeaderInterceptor = (url, options) => {
  // 获取token
  let token = sessionStorage.getItem('cm-authenticationToken');

  const authHeader = {
    "Content-Type": 'application/json;charset=UTF-8',
    'Accept-Language': 'zh-CN',
    "Accept": 'application/json',
    "Access-Control-Allow-Origin": '*',
    'version': 'v1',
    "Authorization": 'Bearer ' + token,
  };

  // 获取token的请求头
  const loginHeader = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic d2ViLWNsaWVudDpzZWNyZXQ="
  }

  if (url === '/oauth/token') {
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: loginHeader },
    }
  }
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// 响应拦截器
const demoResponseInterceptors = (response, options) => {
  // 获取refresh_token
  let refresh_token = sessionStorage.getItem('cm-authenticationRefreshToken');
  // 错误码统一处理
  if (response.status === 401) {
    // history.push('/user/login');
    // message.error('请重新登录');
    axios('/oauth/token', {
      method: 'POST',
      params: {
        grant_type: "refresh_token",
        client_id: 'web-client',
        client_secret: 'secret',
        refresh_token: refresh_token,
      },
    }).then((res) => {
      if (res.status == 200) {
        let token = res.data.access_token;
        let refreshToken = res.data.refresh_token;
        // 如果有token 保存到会话存储
        if (token) {
          sessionStorage.setItem('cm-authenticationToken', res.data.access_token);
        }
        if (refreshToken) {
          sessionStorage.setItem('cm-authenticationRefreshToken', res.data.refresh_token);
        }
        // 如果两个token 都有
        if (token && refreshToken) {
          // 返回之前请求的接口
          return axios(options)
        }
      }
    })
  }
  return response;
};

//响应拦截器配置
export const request = {
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [demoResponseInterceptors],
}
