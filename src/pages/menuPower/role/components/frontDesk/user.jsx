import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, message, Popconfirm } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DownloadOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/util/api';
import AddRoleAndedit from './components/addRoleAndedit';
import AddUser from './components/addUser';
import EditUser from './components/editUser';

const userData = [
    {
        id: 1,
        name: '张三',
        coding: '23312321',
        sort: '1',
    },
    {
        id: 12,
        name: '李四',
        coding: '321221113',
        sort: '13',
    },
    {
        id: 1314,
        name: '王五',
        coding: '11111123333',
        sort: '15'
    }
]

function user(props) {

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([])
    const [roleOpen, setRoleOpen] = useState(false);
    const [userAddOpen, setUserAddOpen] = useState(false);
    const [userRedactOpen, setUserRedactOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [record, setRecord] = useState({});
    const [id, setId] = useState();
    const [tableIndex, setTableIndex] = useState();
    const [userId, setUserId] = useState([]);



    const initData = () => {
        api.getRoles().then((res) => {
            setData(res);
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

    const userColumns = [
        {
            title: '登录账号',
            align: 'center',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '姓名',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {/* <a onClick={() => { userRedact(record) }}>编辑</a> */}
                    <a onClick={() => { userDel(record) }}>删除</a>
                </Space>
            ),
        },
    ];

    // 点击角色编辑
    const roleRedact = (record) => {
        setRoleOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 点击角色删除
    const roleDel = (record) => {
        console.log('删除', record);
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

    // 点击用户编辑
    const userRedact = (record) => {
        setUserRedactOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 点击与用户删除
    const userDel = (record) => {
        console.log('删除', record);
    };

    // 点击新增角色
    const showModal = (data) => {
        setRoleOpen(data);
        setModalTitle('新增');
    };

    // 点击添加用户
    const addUserShowModal = (data) => {
        setUserAddOpen(data);
        setModalTitle('添加用户');
    };

    const addUser = (id, apiUserId) => {
        api.putRolesPemissions(id, apiUserId).then((res) => {
            message.success('添加成功');
            setUserAddOpen(false);
            roleClickShowUser(id);
        }).catch((res) => {
            message.error('添加失败');
            setUserAddOpen(false);
        })
    }

    const redactUserShowModal = (data) => {
        setUserRedactOpen(data);
        setModalTitle('编辑用户');
    }

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

    // 点击角色显示用户
    const roleClickShowUser = (record, index) => {
        console.log(record);
        setTableIndex(index);
        setId(record.id);
        api.getRolesUser(record.id).then((res) => {
            console.log(res);
            setUserData(res)
        })
    };

    // 点击表格添加颜色
    const rowClassNameFun = (record, index) => {
        if (index === tableIndex) {
            return 'mySelfClassName'
        };
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
                            dataSource={data}
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
                    <AddUser vis={userAddOpen} fn={addUserShowModal} title={modalTitle} userId={userId} id={id} onAddUser={addUser} />
                    <EditUser vis={userRedactOpen} fn={redactUserShowModal} title={modalTitle} userRecord={record} />
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
                            <Button type="primary" onClick={addUserShowModal} icon={<PlusOutlined />}>添加用户</Button>
                            <Button icon={<DeleteOutlined />}>删除</Button>
                        </Space>
                    </div>
                    <div>
                        <Table
                            columns={userColumns}
                            rowKey={record => { return record.id }}
                            dataSource={userData}
                            bordered
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default user;