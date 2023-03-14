
// 菜单管理

import React, { useState, useEffect } from 'react';
import { Button, message, Space, Table, Popconfirm, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '@/util/api';
import MenuAddAndEdit from './components/menuAddAndedit'

function menuManage(props) {

    const [data, setData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [record, setRecord] = useState({})

    const initData = () => {
        api.getMenus().then((res) => {
            setData(res);
        })
    }

    useEffect(() => {
        initData();
    }, [])

    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            align: 'center',
        },
        {
            title: '菜单类型',
            dataIndex: 'menuType',
            align: 'center',
            render: (_, { menuType }) => (
                menuType === '1' ? <Tag color='rgb(45, 183, 245)'>一级菜单</Tag> : <Tag color='rgb(135, 208, 104)'>子菜单</Tag>
            ),
        },
        {
            title: '排序',
            dataIndex: 'sort',
            align: 'center',
            render: (_, { sort }) => (
                <Tag>{sort}</Tag>
            ),
        },
        {
            title: '菜单路径',
            dataIndex: 'path',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { redact(record) }}>编辑</a>
                    <Popconfirm
                        title="确定删除该记录吗？"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { del(record) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // 点击新增
    const showModal = (data) => {
        setMenuOpen(data);
        setModalTitle('新增');
    };

    // 新增函数
    const addMenu = (params) => {
        api.postMenus(params).then((res) => {
            message.success('添加成功');
            setMenuOpen(false);
            initData();
        }).catch((res) => {
            message.success('添加失败');
            setMenuOpen(false);
        })
    }

    // 点击编辑
    const redact = (record) => {
        setMenuOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 修改函数
    const redactMenu = (id, params) => {
        api.patchMenus(id, params).then((res) => {
            message.success('修改成功');
            setMenuOpen(false);
            initData();
        }).catch((res) => {
            message.error('修改失败');
            setMenuOpen(false);
        })
    }

    // 点击删除
    const del = (record) => {
        api.deleteMenus(record.id).then((res) => {
            message.success('删除成功');
            initData()
        }).catch((res) => {
            message.error('删除失败')
        })
    };


    return (
        <div style={{ padding: 20, background: 'white' }}>
            <Space>
                <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>新增</Button>
            </Space>
            <div style={{ marginTop: 20 }}>
                <Table
                    columns={columns}
                    rowKey={record => { return record.id }}
                    dataSource={data}
                />
            </div>
            <MenuAddAndEdit vis={menuOpen} title={modalTitle} fn={showModal} onAddMenu={addMenu} onRedact={redactMenu} record={record} />
        </div>
    );
}

export default menuManage;