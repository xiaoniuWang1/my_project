import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, Modal, Form, message } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import api from '@/util/api';

function addUser(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [data, setData] = useState([]);
    const [addUserId, setAddUserId] = useState([]);

    const formRef = useRef(null);

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '姓别',
            dataIndex: 'sexDictText',
            align: 'center'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            align: 'center'
        },
    ];

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        api.getUserBasics().then((res) => {
            setData(res)
        })
    }, [props.vis]);

    // 表格多选框
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            let userIdArr = [];
            selectedRows.map((item) => {
                userIdArr.push(item.id);
            });
            setAddUserId(userIdArr);
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
        let allUserId = addUserId;
        allUserId.push(...powerId);
        let apiUserId = allUserId.filter((item, index, array) => {
            return array.indexOf(item) === index
        });
        props.onAddUser(props.id, apiUserId);
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