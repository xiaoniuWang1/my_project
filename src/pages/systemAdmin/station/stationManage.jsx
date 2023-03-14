
// 系统管理 岗位管理

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Modal, Space, Table, Form, message, Popconfirm } from 'antd';
import { SearchOutlined, RedoOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import api from '@/util/api'

function stationManage(props) {

    const [data, setData] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [redact_jobName, setRedact_jobName] = useState('');
    const [redact_jobCode, setRedact_jobCode] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const [redact_description, setRedact_description] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [id, setId] = useState()

    const formRef = useRef(null);

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '岗位名称',
            dataIndex: 'jobName',
        },
        {
            title: '岗位编码',
            dataIndex: 'jobCode',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { jobRedact(record) }}>编辑</a>
                    <Popconfirm
                        title="确定删除该记录吗？"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { jobDel(record) }}
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
        api.getJobs().then((res) => {
            setData(res);
        });
    }

    useEffect(() => {
        initData()
    }, [])

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            let params = values;
            if (modalTitle === '编辑') {
                params.id = id;
                api.patchJob(id, params).then((res) => {
                    setOpen(false);
                    message.success('修改成功');
                    initData();
                }).catch((res) => {
                    message.error('修改失败');
                    setOpen(false);
                });
            }
            if (modalTitle === '新增') {
                api.postJob(params).then((res) => {
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

    // 打开modal
    const showModal = () => {
        setOpen(true);
        setModalTitle('新增');
        setRedact_jobName('');
        setRedact_jobCode('');
        setRedact_sort('');
        setRedact_description('');
    }

    // 关闭Modal
    const handleCancel = () => {
        setOpen(false);
    };

    // 编辑
    const jobRedact = (record) => {
        console.log('编辑');
        setModalTitle('编辑');
        setOpen(true);
        setRedact_jobName(record.jobName);
        setRedact_jobCode(record.jobCode);
        setRedact_sort(record.sort);
        setRedact_description(record.description);
        setId(record.id)
    };

    // 删除
    const jobDel = (record) => {
        api.deleteJob(record.id).then((res) => {
            message.success('删除成功');
            initData();
        }).catch((res) => {
            message.error('删除失败')
        })
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
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>新增</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button icon={<DownloadOutlined />}>导出</Button>
                </Space>
            </div>
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey={record => { return record.id }} />
            </div>
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
                    height: "calc(60vh - 55px - 53px)",
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    ref={formRef}
                >
                    <Form.Item
                        label="岗位名称"
                        name="jobName"
                        rules={[
                            {
                                required: true,
                                message: '职务名称不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_jobName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="岗位编码"
                        name="jobCode"
                        rules={[
                            {
                                required: true,
                                message: '职务编码不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_jobCode}
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
                        initialValue={redact_description}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default stationManage;