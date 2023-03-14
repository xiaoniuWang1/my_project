
// 菜单授权

import React, { useState, useEffect } from 'react';
import { Button, message, Space, Table, Input, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '@/util/api';

function rolePower(props) {

    const [data, setData] = useState([]);
    const [chechboxValue, setChechboxValue] = useState([]);
    const [roleMenus, setRoleMenus] = useState([]);
    const [id, setId] = useState();
    const [tableIndex, setTableIndex] = useState();

    const initData = () => {
        api.getRoles().then((res) => {
            setData(res)
        });
    }

    useEffect(() => {
        initData()
    }, [])

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'displayName',
            align: 'center',
        },
        {
            title: '角色编码',
            dataIndex: 'roleName',
            align: 'center'
        },
    ];

    // 菜单权限 change事件
    const checkboxChange = (checkedValue) => {
        setRoleMenus(checkedValue)
    };

    // 点击角色显示权限
    const roleClickShowPower = (record, index) => {
        setTableIndex(index);
        setId(record.id);
        // 点击获取角色所拥有的权限
        api.getMenus().then((res) => {
            setChechboxValue(res)
        });
        // 获取菜单权限列表
        api.getSysRolemenuRoleId(record.id).then((res) => {
            let menuNameArr = [];
            res.map((item) => {
                menuNameArr.push(item.menu.id);
            });
            setRoleMenus(menuNameArr)
        })
    };

    // 点击表格添加颜色
    const rowClassNameFun = (record, index) => {
        if (index === tableIndex) {
            return 'mySelfClassName'
        };
    }

    // 点击保存
    const roleMenusEdit = () => {
        api.putUserMenu(id, roleMenus).then((res) => {
            message.success('修改成功');
        }).catch((res) => {
            message.error('修改失败')
        })
    }

    return (
        <div style={{ padding: 20, background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%', background: ' rgb(240, 242, 245)' }}>
                <div style={{ paddingRight: 10, background: 'white', width: '50%' }}>
                    <Space>
                        角色名称:<Input style={{ width: 200 }} />
                        <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                    </Space>
                    <div style={{ marginTop: 20 }}>
                        <Table
                            columns={columns}
                            rowKey={record => { return record.id }}
                            dataSource={data}
                            bordered
                            onRow={(record, index) => {
                                return {
                                    onClick: () => { roleClickShowPower(record, index) }
                                }
                            }}
                            rowClassName={rowClassNameFun}
                        />
                    </div>
                </div>
                <div style={{ paddingLeft: 10, marginLeft: 5, background: 'white', width: '50%' }}>
                    <Space>
                        菜单权限:
                        <Button type="primary" onClick={roleMenusEdit}>保存</Button>
                    </Space>
                    <div style={{ padding: 30 }}>
                        <Checkbox.Group
                            onChange={checkboxChange}
                            value={roleMenus}
                        >
                            {
                                chechboxValue.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Checkbox value={item.id}>{item.menuName}</Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </Checkbox.Group>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default rolePower;