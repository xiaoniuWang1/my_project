
// 系统管理 职务管理

import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Space, Table, Modal, Form, message, Popconfirm } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import api from '@/util/api';

function jobManage(props) {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称

    const [redact_name, setRedact_name] = useState('');
    const [redact_coding, setRedact_coding] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const [redact_describe, setRedact_describe] = useState('');
    const [id, setId] = useState();

    const formRef = useRef(null);
    const inpRef = useRef(null);

    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '职务名称',
            dataIndex: 'positionName',
            align: 'center'
        },
        {
            title: '职务编码',
            dataIndex: 'positionCode',
            align: 'center'
        },
        {
            title: '排序',
            dataIndex: 'sort',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a>用户</a>
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

    const initData = () => {
        api.getSysPositions().then((res) => {
            setData(res)
        })
    }

    useEffect(() => {
        initData();
    }, [])

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
        setRedact_name(record.positionName);
        setRedact_coding(record.positionCode);
        setRedact_sort(record.sort);
        setRedact_describe(record.description);
        setId(record.id);
    };

    // 点击删除
    const del = (record) => {
        api.deleteSysPositions(record.id).then((res) => {
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
        formRef.current.validateFields().then(values => {
            let params = values;
            if (modalTitle === '编辑') {
                params.id = id;
                api.patchAmendSysPosition(id, params).then((res) => {
                    setOpen(false);
                    message.success('修改成功');
                    initData();
                }).catch((res) => {
                    message.error('修改失败');
                    setOpen(false);
                });
            }
            if (modalTitle === '新增') {
                api.postAddSysPositions(params).then((res) => {
                    setOpen(false);
                    message.success('添加成功');
                    initData();
                }).catch((res) => {
                    message.error('新增失败');
                    setOpen(false);
                });
            }
        }).catch(reason => {
            message.warning('表单输入不允许为空，请检查');
        })
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
                        name="positionName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="职务编码"
                        name="positionCode"
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
                                name="positionName"
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
                                name="positionCode"
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
                                name="description"
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
                <Table bordered rowKey={record => { return record.id }} rowSelection={{ ...rowSelection }} columns={columns} dataSource={data} />
            </div>

        </div>
    );
}

export default jobManage;