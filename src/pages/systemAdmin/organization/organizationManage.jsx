import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DownloadOutlined, ImportOutlined } from '@ant-design/icons';
import BaseModal from './components/Modal/modal';
import api from '@/util/api';
import request from "umi-request";

const data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: '部门',
        sort: 30,
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                sort: 30,
                address: '部门',
            },
            {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                sort: 30,
                address: '组织',
                children: [
                    {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        sort: 30,
                        address: '部门',
                    },
                ],
            },
            {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                sort: 30,
                address: '组织',
                children: [
                    {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        sort: 30,
                        address: '部门',
                        children: [
                            {
                                key: 1311,
                                name: 'Jim Green jr.',
                                age: 25,
                                sort: 30,
                                address: '组织',
                            },
                            {
                                key: 1312,
                                name: '组织',
                                age: 18,
                                sort: 30,
                                address: '部门',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        sort: 30,
        address: '组织',
    },
];

function organizationManage(props) {
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [record, setRecord] = useState({});
    const [data, setData] = useState([]);
    const columns = [
        {
            title: '组织名称',
            dataIndex: 'orgName',
            align: 'center'
        },
        {
            title: '组织编码',
            dataIndex: 'orgCode',
            align: 'center'
        },
        {
            title: '组织类型',
            dataIndex: 'orgType',
            align: 'center'
        },
        {
            title: '组织排序',
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
                    <a onClick={() => { del(record) }}>删除</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        api.getOrganizationsParentId().then((res) => {
            console.log(res);
            setData(res)
        });
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

    // 点击删除
    const del = (record) => {
        console.log('删除');
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
                />
            </div>
            <BaseModal vis={open} fn={showModal} title={modalTitle} record={record}></BaseModal>
        </div>
    );
}

export default organizationManage;