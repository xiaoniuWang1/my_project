import { Space } from 'antd';
import { SelectLang, useModel } from 'umi';
// import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      {/* <NoticeIconView /> */}
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
