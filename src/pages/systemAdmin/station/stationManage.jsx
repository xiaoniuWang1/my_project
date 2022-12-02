import React, { useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const columns = [
    {
        title: '序号',
        dataIndex: 'name',
    },
    {
        title: '岗位名称',
        dataIndex: 'age',
    },
    {
        title: '岗位编码',
        dataIndex: 'address',
    },
    {
        title: '排序',
        dataIndex: 'address',
    },
    {
        title: '描述',
        dataIndex: 'address',
    },
    {
        title: '操作',
        dataIndex: 'address',
    },
];

const data = [];

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

function stationManage(props) {

    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div style={{ background: 'white', height: '100%', width: '100%', padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
                <Space>
                    <span>岗位名称：</span><Input />
                    <span>岗位编码：</span><Input />
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                    <Button icon={<RedoOutlined />}>重置</Button>
                </Space>
            </div>
            <div style={{ marginBottom: 20 }}>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />}>新增</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button icon={<DownloadOutlined />}>导出</Button>
                </Space>
            </div>
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default stationManage;