
// 角色管理

import React from 'react';
import { Tabs } from 'antd';
import User from './components/frontDesk/user';
import Backstage from './components/backstage/backstage';
import RolePower from './components/rolePower/rolePower';
import '../../indexCss/index.css'

const { TabPane } = Tabs;
function roleManage(props) {
    return (
        <div style={{ padding: 20, background: 'white', height: '100%' }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab='用户' key='1'>
                    <User />
                </TabPane>
                <TabPane tab='权限' key='2'>
                    <Backstage />
                </TabPane>
                <TabPane tab='菜单' key='3'>
                    <RolePower />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default roleManage;