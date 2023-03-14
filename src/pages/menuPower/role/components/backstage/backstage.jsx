import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, message, Popconfirm } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DownloadOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/util/api';
import AddRoleAndedit from './components/addRoleAndedit';
import AddPower from './components/addPower';
import EditUser from './components/editUser';

function backstage(props) {

    const [roleData, setRoleData] = useState([]);
    const [record, setRecord] = useState();
    const [roleOpen, setRoleOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [id, setId] = useState();
    const [tableIndex, setTableIndex] = useState();
    const [powerData, setPowerData] = useState([]);
    const [powerAddOpen, setPowerAddOpen] = useState(false);
    const [powerId, setPowerId] = useState([]);


    const initData = () => {
        api.getRoles().then((res) => {
            setRoleData(res);
        });
    }

    useEffect(() => {
        initData()
    }, [])

    const roleColumns = [
        {
            title: '序号',
            align: 'center',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '角色名称',
            dataIndex: 'displayName',
            align: 'center'
        },
        {
            title: '角色编码',
            dataIndex: 'roleName',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { roleRedact(record) }}>编辑</a>
                    {/* <a onClick={() => { roleDel(record) }}>删除</a> */}
                    <Popconfirm
                        title="确定删除该记录吗？"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { roleDel(record) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const powerColumns = [
        {
            title: '序号',
            dataIndex: 'id',
            align: 'center',
        },
        {
            title: '职务名称',
            dataIndex: 'displayName',
            align: 'center'
        },
        {
            title: '职务编码',
            dataIndex: 'authority',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除该记录吗？"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { powerDel(record) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    // 点击角色编辑
    const roleRedact = (record) => {
        setRoleOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 角色编辑接口
    const onRoleEdit = (id, params) => {
        api.putRoles(id, params).then((res) => {
            message.success('修改成功');
            initData();
            setRoleOpen(false);
        }).catch((res) => {
            message.error('修改失败');
            setRoleOpen(false);
        })
    };

    // 点击新增角色
    const showModal = (data) => {
        setRoleOpen(data);
        setModalTitle('新增');
    };

    // 新增角色接口
    const onAddRole = (params) => {
        api.postRoles(params).then((res) => {
            setRoleOpen(false);
            message.success('添加成功');
            initData();
        }).catch((res) => {
            message.error('新增失败');
            setRoleOpen(false);
        });
    };

    // 点击角色删除
    const roleDel = (record) => {
        let params = {
            roleName: record.roleName,
            displayName: record.displayName
        }
        api.deleteRoles(record.id, params).then((res) => {
            message.success('删除成功');
            initData()
        }).catch((res) => {
            message.error('删除失败')
        })
    };

    // 点击表格显示权限的接口
    const clickRoleShowPower = (id) => {
        api.getRolesPower(id).then((res) => {
            let powerIdArr = [];
            res.permissions.map((item) => {
                powerIdArr.push(item.id)
            });
            setPowerId(powerIdArr)
            setPowerData(res.permissions)
        })
    }

    // 点击角色显示权限
    const roleClickShowUser = (record, index) => {
        setTableIndex(index);
        setId(record.id);
        clickRoleShowPower(record.id);
    };

    // 点击表格添加颜色
    const rowClassNameFun = (record, index) => {
        if (index === tableIndex) {
            return 'mySelfClassName'
        };
    };

    // 点击权限删除
    const powerDel = (record) => {
        let delId = powerId.indexOf(record.id);
        powerId.splice(delId, 1);
        api.putRolesPemissions(id, powerId).then((res) => {
            message.success('删除成功');
            clickRoleShowPower(id);
        }).catch((res) => {
            message.error('删除失败');
        })
    };

    // 点击添加权限
    const addPowerShowModal = (data) => {
        setPowerAddOpen(data);
        setModalTitle('添加用户');
    };

    const addRolePower = (id, apiPowerId) => {
        api.putRolesPemissions(id, apiPowerId).then((res) => {
            message.success('添加成功');
            setPowerAddOpen(false);
            clickRoleShowPower(id);
        }).catch((res) => {
            message.error('添加失败');
            setPowerAddOpen(false);
        })
    }

    return (
        <div style={{ height: '100%', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%', background: ' rgb(240, 242, 245)' }}>
                <div style={{ paddingRight: 10, background: 'white', width: '65%' }}>
                    <div>
                        <Space>
                            组织名称:<Input style={{ width: 200 }} />
                            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                            <Button type="primary" icon={<RedoOutlined />}>重置</Button>
                        </Space>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <Space>
                            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>新增角色</Button>
                            <Button icon={<DownloadOutlined />}>导出</Button>
                            <Button icon={<ImportOutlined />}>导入</Button>
                        </Space>
                    </div>
                    <div>
                        <Table
                            columns={roleColumns}
                            rowKey={record => { return record.id }}
                            dataSource={roleData}
                            bordered
                            onRow={(record, index) => {
                                return {
                                    onClick: () => { roleClickShowUser(record, index) }
                                }
                            }}
                            rowClassName={rowClassNameFun}
                        />
                    </div>
                    <AddRoleAndedit vis={roleOpen} fn={showModal} title={modalTitle} onAddRole={onAddRole} onRoleEdit={onRoleEdit} roleRecord={record} />
                    <AddPower vis={powerAddOpen} fn={addPowerShowModal} title={modalTitle} powerId={powerId} id={id} onAddRolePower={addRolePower} />
                    {/* <EditUser vis={userRedactOpen} fn={redactUserShowModal} title={modalTitle} userRecord={record} /> */}
                </div>

                <div style={{ paddingLeft: 10, marginLeft: 5, background: 'white', width: '35%' }}>
                    <div>
                        <Space>
                            姓名:<Input style={{ width: 150 }} />
                            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                            <Button type="primary" icon={<RedoOutlined />}>重置</Button>
                        </Space>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <Space>
                            <Button type="primary" onClick={addPowerShowModal} icon={<PlusOutlined />}>添加权限</Button>
                            <Button icon={<DownloadOutlined />}>导出</Button>
                            <Button icon={<ImportOutlined />}>导入</Button>
                        </Space>
                    </div>
                    <div>
                        <Table
                            columns={powerColumns}
                            rowKey={record => { return record.id }}
                            dataSource={powerData}
                            bordered
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default backstage;