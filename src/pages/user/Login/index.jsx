import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import { useState } from 'react';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';
import request from 'umi-request'; //导入接口

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    // 清楚之前的token
    sessionStorage.removeItem('cm-authenticationToken');
    sessionStorage.removeItem('cm-authenticationRefreshToken');

    // 传参
    const params = {
      'grant_type': 'password',
      'username': values.username,
      'password': values.password
    }
    // 请求头
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic d2ViLWNsaWVudDpzZWNyZXQ="
    }
    request('/oauth/token', {
      headers: headers,
      method: 'POST',
      params: params,
    }).then(async (res) => {
      // 保存token做判断
      // let token = res?.access_token;
      let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInRvZG8ucmVhZCIsInRvZG8ud3JpdGUiXSwidGVuYW50SWQiOiJnaXRlZSIsIm5hbWUiOiLnrqHnkIblkZgiLCJleHAiOjE2NzUzMTI3MTMsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJBRE1JTiJdLCJqdGkiOiJDNU1QYVEybmQ0YTJYTWtROVI1cVdQTkVKY3ciLCJjbGllbnRfaWQiOiJ3ZWItY2xpZW50In0.MAwW5MXV4ryDQcZQpLKmhHTbWhsOQZK9dH1Vhu-5NWp5aTuhH6U1cVdJ0-P-oT_3B_Z7YSXL50WctYxHqnsXD9KhxgbODSh9pIOQRXTogXLvlSd1u8xqvONj8ZQHA0enWbNh2KBgJyyTyt1mKQG9LnMU4M-4UPYP3wtZswdMwz2ddn8Iqq822qQ31rskhowv98QH3_a3G2dNjTYKRWpZWSZFwNvB4pRYHESAhqyD5-hjT3ZzJvJKhglwk5_aTW-u6EgLDl8wfCCvoxGZgffRgRPhWbG0A71Ym84WKgXy1D-kSEPWRE2RK8EOWAFAq8rZXbVW2llCSZb33_fuwa504A';
      let refreshToken = res?.refresh_token;
      // 如果有token 保存到会话存储
      if (token) {
        sessionStorage.setItem('cm-authenticationToken', token);
      }
      if (refreshToken) {
        sessionStorage.setItem('cm-authenticationRefreshToken', res.refresh_token);
      }
      // 如果token不为空 登录成功 跳转首页
      if (token !== null && token !== undefined) {
        console.log(token);
        message.success('登录成功');
        // 获取用户信息
        await fetchUserInfo()
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        history.push('/');
        return;
      }
    }).catch((error) => {
      console.log(error);
      message.error('密码错误')
    })
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle=''
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <div style={{ margin: '10px 0px 50px 0px' }}></div>
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder='用户名'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='密码'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
