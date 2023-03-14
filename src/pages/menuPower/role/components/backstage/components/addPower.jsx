import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, Modal, Form, message } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import api from '@/util/api';

function addUser(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [data, setData] = useState([]);
    const [powerId, setPowerId] = useState([]);
    const [addPowerId, setAddPowerId] = useState([]);
    const formRef = useRef(null);

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
        setPowerId(props.powerId);
        setOpen(props.vis);
        setModalTitle(props.title);
        api.getPermissions().then((res) => {
            setData(res)
        })
    }, [props.vis]);

    // 表格多选框
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let powerIdArr = [];
            selectedRows.map((item) => {
                powerIdArr.push(item.id);
            });
            setAddPowerId(powerIdArr);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        // },
    };

    // 新增Modal确定
    const handleOk = () => {
        let allPowerId = addPowerId;
        allPowerId.push(...powerId);
        let apiPowerId = allPowerId.filter((item, index, array) => {
            return array.indexOf(item) === index
        });
        // if (addPowerId.length > 0) {
        props.onAddRolePower(props.id, apiPowerId);
        // } else {
        //     message.error('请选择添加的对象')
        // }
    };

    // 关闭新增Modal
    const handleCancel = () => {
        props.fn(false)
    };

    return (
        <div>
            <Modal
                title={modalTitle}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
                width={'60%'}
                style={{
                    maxWidth: "100vw",
                    top: 100,
                    paddingBottom: 0,
                }}
                bodyStyle={{
                    height: "calc(70vh - 55px - 53px)",
                }}
            >
                <div>
                    <Space>
                        组织名称:<Input style={{ width: 200 }} />
                        <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                        <Button type="primary" icon={<RedoOutlined />}>重置</Button>
                    </Space>
                    <div style={{ marginTop: 30 }}>
                        <Table
                            columns={columns}
                            rowKey={record => { return record.id }}
                            dataSource={data}
                            bordered
                            rowSelection={{ ...rowSelection }}
                            size="small"
                            scroll={{
                                y: 240,
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default addUser;