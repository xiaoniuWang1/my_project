import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, message, Popconfirm } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DownloadOutlined, ImportOutlined } from '@ant-design/icons';
import BaseModal from './components/Modal/modal';
import api from '@/util/api';

function organizationManage(props) {
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [record, setRecord] = useState({});
    const [data, setData] = useState([]);
    const columns = [
        {
            title: '部门名称',
            dataIndex: 'orgName',
            align: 'center'
        },
        {
            title: '部门编码',
            dataIndex: 'orgCode',
            align: 'center'
        },
        {
            title: '部门类型',
            dataIndex: 'orgType',
            align: 'center'
        },
        {
            title: '部门排序',
            dataIndex: 'sort',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'address',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { addSubordinate(record) }}>新增下级</a>
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

    // 初始化部门数据
    const initData = () => {
        api.getOrganizationsParentId().then((res) => {
            setData(res);
        });
    }

    useEffect(() => {
        initData()
    }, [])

    // 显示新增Modal
    const showModal = (data) => {
        setOpen(data);
        setModalTitle('新增');
    };

    // 点击新增下级
    const addSubordinate = (record) => {
        setOpen(true);
        setModalTitle('新增下级');
        setRecord(record);
    };

    // 点击编辑
    const redact = (record) => {
        setOpen(true);
        setModalTitle('编辑');
        setRecord(record);
    };

    // 子组件编辑信息接口函数
    const amendOrg = (id, params) => {
        api.patchAmendOrganizations(id, params).then((res) => {
            message.success('修改成功')
            setOpen(false)
            initData()
        })
    }

    // 添加部门
    const addOrg = (params) => {
        api.addOrganization(params).then((res) => {
            message.success('添加成功');
            setOpen(false)
            initData()
        }).catch((res) => {
            message.error('添加失败');
            setOpen(false);
        })
    }

    // 点击删除
    const del = (record) => {
        console.log('删除');
        api.deleteOrganizations(record.id).then((res) => {
            message.success('删除成功')
            initData()
        })
    }

    return (
        <div style={{ background: 'white', height: '100%', padding: 20 }}>
            <div>
                <Space>
                    组织名称:<Input style={{ width: 200 }} />
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                    <Button type="primary" icon={<RedoOutlined />}>重置</Button>
                </Space>
            </div>
            <div style={{ margin: '20px 0' }}>
                <Space>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>新增</Button>
                    <Button icon={<DownloadOutlined />}>导出</Button>
                    <Button icon={<ImportOutlined />}>导入</Button>
                </Space>
            </div>
            <div>
                <Table
                    columns={columns}
                    bordered
                    dataSource={data}
                    rowKey={(record) => record.id}
                />
            </div>
            <BaseModal vis={open} fn={showModal} onAmend={amendOrg} onAdd={addOrg} title={modalTitle} record={record}></BaseModal>
        </div>
    );
}

export default organizationManage;