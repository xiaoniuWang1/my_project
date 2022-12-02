import React, { useState, useRef } from 'react';
import { Button, Input, Space, Table, Modal, Form, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined, UserSwitchOutlined } from '@ant-design/icons';

const data = [
    {
        id: 1,
        name: '123',
        coding: '321',
        sort: '1',
    },
    {
        id: 12,
        name: '1232',
        coding: '3213',
        sort: '13',
    },
    {
        id:1314,
        name:'岳不群',
        coding:'12333',
        sort:'15'
    }
];

function jobManage(props) {

    // const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [confirmLoading, setConfirmLoading] = useState(false);//新增确定时loding动画
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称

    const [redact_name, setRedact_name] = useState('');
    const [redact_coding, setRedact_coding] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const [redact_describe, setRedact_describe] = useState('');

    const formRef = useRef(null);
    const inpRef = useRef(null);

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '职务名称',
            dataIndex: 'name',
        },
        {
            title: '职务编码',
            dataIndex: 'coding',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>用户</a>
                    <a onClick={() => { redact(record) }}>编辑</a>
                    <a onClick={() => { del(record) }}>删除</a>
                </Space>
            ),
        },
    ];

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
        setRedact_name(record.name)
        setRedact_coding(record.coding)
        setRedact_sort(record.sort)
        setRedact_describe(record.name)
    };

    // 点击删除
    const del = (record) => {
        console.log('删除', record);
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
    const showModal = () => {
        setOpen(true);
        setModalTitle('新增');
        setRedact_name('')
        setRedact_coding('')
        setRedact_sort('')
        setRedact_describe('')
    };

    // 新增Modal确定
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            console.log(formRef);
            formRef.current.validateFields().then(values => {
                console.log(values);
                setOpen(false);
                setConfirmLoading(false);
            }).catch(reason => {
                message.warning('表单输入不允许为空，请检查');
                setConfirmLoading(false);
            })
        }, 2000);
    };

    // 关闭新增Modal
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div style={{ background: 'white', height: '100%', width: '100%', padding: 20 }}>

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
                        label="职务名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="职务编码"
                        name="coding"
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
                    <Modal
                        title={modalTitle}
                        open={open}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        confirmLoading={confirmLoading}
                        destroyOnClose={true}
                    >
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
                            ref={formRef}
                        >
                            <Form.Item
                                label="职务名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '职务名称不能为空',
                                    },
                                ]}
                                style={{ marginBottom: 25 }}
                                initialValue={redact_name}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="职务编码"
                                name="coding"
                                rules={[
                                    {
                                        required: true,
                                        message: '职务编码不能为空',
                                    },
                                ]}
                                style={{ marginBottom: 25 }}
                                initialValue={redact_coding}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="排序"
                                name="sort"
                                initialValue={redact_sort}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="描述"
                                name="describe"
                                initialValue={redact_describe}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button icon={<DownloadOutlined />}>导出</Button>
                </Space>
            </div>

            <div>
                <Table rowKey={record => { return record.id }} rowSelection={{ ...rowSelection }} columns={columns} dataSource={data} />
            </div>

        </div>
    );
}

export default jobManage;