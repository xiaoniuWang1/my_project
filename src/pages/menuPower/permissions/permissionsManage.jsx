
// 权限管理

import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import api from '@/util/api';

function permissionsManage(props) {
    const [data, setData] = useState([]);

    const columns = [
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
    ];

    useEffect(() => {
        api.getPermissions().then((res) => {
            setData(res)
        })
    }, [])

    return (
        <div>
            <Table bordered rowKey={record => { return record.id }} columns={columns} dataSource={data} />
        </div>
    );
}

export default permissionsManage;