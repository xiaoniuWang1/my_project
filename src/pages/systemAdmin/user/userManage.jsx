
// 系统管理 用户管理

import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, CarryOutOutlined, FormOutlined, SearchOutlined, RedoOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Input, Tree, Form, Button, Space, Table, Menu, Dropdown, Badge, message, Popconfirm } from 'antd';
import BaseModal from './components/Modal/modal';
import api from '@/util/api'
import { login } from '@/services/ant-design-pro/api';

const data = [
    {
        id: 'user',
        name: '张三',
        sex: '男',
        phone: '18322332233',
        email: '136@qq.com',
        jobNumber: '778899',
        status: '正常',
    },
    {
        id: 'lisi',
        name: '李四',
        sex: '女',
        phone: '183111332233',
        email: '136@163.com',
        jobNumber: '667788',
        status: '异常',
    }
];

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: (
                            <>
                                <div>multiple line title</div>
                                <div>multiple line title</div>
                            </>
                        ),
                        key: '0-0-0-1',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <CarryOutOutlined />,
                        switcherIcon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-1-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-1-0-1',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
        ],
    },
];

function userManage(props) {

    const [showLine, setShowLine] = useState(true);
    const [showIcon, setShowIcon] = useState(false);
    const [showLeafIcon, setShowLeafIcon] = useState(true);

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [record, setRecord] = useState({});
    const [data, setData] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [orgId, setOrgId] = useState()

    const inpRef = useRef(null);

    const initData = () => {
        api.getUserBasics().then((res) => {
            setData(res);
        });
        api.getOrganizationsParentId().then((res) => {
            res.map((item) => {
                item.title = item.orgName
                if (item.children.length > 0) {
                    item.children.map((i) => {
                        i.title = i.orgName
                        if (i.children.length > 0) {
                            i.children.map((i) => {
                                i.title = i.orgName
                            })
                        }
                    })
                }
            });
            setTreeData(res);
        });
    };

    useEffect(() => {
        initData()
    }, [])

    // 表格
    const columns = [
        {
            title: '登录账号',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '性别',
            dataIndex: 'sexDictText',
            align: 'center'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            align: 'center'
        },
        {
            title: '电子邮件',
            dataIndex: 'email',
            align: 'center'
        },
        {
            title: '工号',
            dataIndex: 'workNo',
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'statusDictText',
            align: 'center',
            render: (text, record, index) => (
                <span>
                    {text === '正常' ? <Badge status="success" text='正常' /> : <Badge status="error" text='异常' />}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { redact(record) }}>编辑</a>
                    <Dropdown
                        overlay={menu(record)}
                    >
                        <a>
                            更多 <DownOutlined />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    // 下拉列表操作项
    const menu = (record) => {
        return (
            <Menu>
                <Menu.Item key='details'>
                    <span>详情</span>
                </Menu.Item>
                <Menu.Item key='amend'>
                    <span>修改密码</span>
                </Menu.Item>
                <Menu.Item key='delete'>
                    {/* <span onClick={() => { clickDel(record) }}>删除</span> */}
                    <Popconfirm
                        title="确定删除该记录吗？"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { clickDel(record) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item key='freeze'>
                    <span>冻结</span>
                </Menu.Item>
            </Menu>
        )
    };

    // 点击查询
    const searchInp = () => {
        inpRef.current.validateFields().then((value) => {
            console.log(value);
        })
    }

    // 点击重置
    const resetInp = () => {
        inpRef.current.resetFields();
    }

    // 点击编辑
    const redact = (record) => {
        console.log(record);
        setOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 修改用户
    const amendUser = (id, params) => {
        api.patchUserBasics(id, params).then((res) => {
            message.success('修改成功')
            setOpen(false)
            initData()
        }).catch((res) => {
            message.error('修改失败');
            setOpen(false);
        });
    }

    // 添加用户
    const addUser = (params) => {
        api.postUserBasic(params).then((res) => {
            message.success('添加成功');
            setOpen(false)
            userBasicsOrg(id);
        }).catch((res) => {
            message.error('新增失败');
            setOpen(false);
        });
    }

    // 点击删除
    const del = (key) => {
        console.log('删除', key,);
        // if (record.key === 'delete') {
        //     api.delUserBasics().then((res) => {
        //         message.success('删除成功');
        //         initData();
        //     }).catch((res) => {
        //         message.error('删除失败');
        //     });
        // }
    };

    const clickDel = (record) => {
        console.log(record);
        api.delUserBasics(record.id).then((res) => {
            message.success('删除成功');
            initData();
        }).catch((res) => {
            message.error('删除失败');
        });
    }

    // 表格多选框
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    // 显示新增Modal
    const showModal = (data) => {
        setOpen(data);
        setModalTitle('新增');
    };

    // 点击部门获取用户的接口
    const userBasicsOrg = (id) => {
        api.getUserBasicsOrg(id).then((res) => {
            setData(res)
        });
    }

    // 点击部门的回调
    const onSelect = (selectedKeys, info) => {
        let id = info.node.id
        setOrgId(id)
        userBasicsOrg(id)
    };

    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ padding: 24, width: 230, background: 'white', height: '100%', marginRight: 15 }}>
                    <div>
                        <Tree
                            showLine={
                                showLine
                                    ? {
                                        showLeafIcon,
                                    }
                                    : false
                            }
                            showIcon={showIcon}
                            onSelect={onSelect}
                            treeData={treeData}
                        />
                    </div>
                </div>
                <div style={{ flex: 1, background: 'white', height: '100%', padding: 20 }}>
                    <div style={{ marginBottom: 20 }}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            ref={inpRef}
                            style={{ display: 'flex' }}
                        >
                            <Form.Item
                                label="登录账号"
                                name="account"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="姓名"
                                name="name"
                                style={{ marginRight: 10 }}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="手机号"
                                name="phone"
                                style={{ marginRight: 10 }}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item style={{ marginRight: 10 }}>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} onClick={searchInp}>查询</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button icon={<RedoOutlined />} htmlType="button" onClick={resetInp}>重置</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <Space>
                            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>新增</Button>
                            <BaseModal vis={open} onAmend={amendUser} onAdd={addUser} fn={showModal} title={modalTitle} record={record} orgId={orgId}></BaseModal>
                            <Button icon={<DeleteOutlined />}>删除</Button>
                            <Button icon={<DownloadOutlined />}>导出</Button>
                            <Button icon={<LockOutlined />}>冻结</Button>
                            <Button icon={<UnlockOutlined />}>解冻</Button>
                        </Space>
                    </div>

                    <div>
                        <Table bordered rowKey={record => { return record.id }} rowSelection={{ ...rowSelection }} columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default userManage;