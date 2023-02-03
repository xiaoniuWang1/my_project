import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, message, Radio, InputNumber } from 'antd';

function modal(props) {
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [redact_upName, setRedact_upName] = useState('');
    const [redact_name, setRedact_name] = useState('');
    const [redact_type, setRedact_type] = useState('');
    const [redact_coding, setRedact_coding] = useState('');
    const [redact_profiles, setRedact_profiles] = useState('');
    const [redact_parentId, setRedact_parentId] = useState('')
    const [redact_sort, setRedact_sort] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '新增下级') {
            setRedact_upName(props.record.orgName)
        }
        if (props.title === '编辑') {
            setRedact_upName(props.record.orgName);
            setRedact_name(props.record.orgName);
            setRedact_type(props.record.orgType);
            setRedact_coding(props.record.orgCode);
            setRedact_profiles(props.record.profiles);
            setRedact_parentId(props.record.parentId);
            setRedact_sort(props.record.sort);
        };
        if (props.title === '新增') {
            setRedact_name('');
            setRedact_type('');
            setRedact_coding('');
            setRedact_profiles('');
            setRedact_parentId('');
            setRedact_sort('');
        }
    }, [props.vis])

    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            let params = values;
            let id = props.record.id
            params.id = id;
            if (props.title === '编辑') {
                props.onAmend(id, params);
            }
            if (props.title === '新增下级') {
                console.log('新增下级');
            }
            if (props.title === '新增') {
                props.onAdd(params)
            }
        }).catch(reason => {
            message.warning('表单输入不允许为空，请检查');
        })
    };

    // 关闭新增Modal
    const handleCancel = () => {
        props.fn(false)
    };

    return (
        <div >
            <Modal
                title={modalTitle}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
                width={'90%'}
                style={{
                    maxWidth: "100vw",
                    top: 30,
                    paddingBottom: 0,
                }}
                bodyStyle={{
                    height: "calc(90vh - 55px - 53px)",
                }}
            >
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    ref={formRef}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    {
                        modalTitle === '新增' || modalTitle === '新增下级' ?
                            <div>
                                {
                                    modalTitle === '新增下级' ?
                                        <Form.Item
                                            label="上级部门"
                                            name="upName"
                                            style={{ marginBottom: 25 }}
                                            initialValue={redact_upName}
                                        >
                                            <Input disabled={true} />
                                        </Form.Item>
                                        :
                                        ''
                                }
                                <Form.Item
                                    label="部门名称"
                                    name="orgName"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入部门名称',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="部门编码"
                                    name="orgCode"
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_coding}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="部门类型" name="orgType">
                                    <Radio.Group value={1}>
                                        <Radio value={2}> 组织 </Radio>
                                        <Radio value={1}> 部门 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="父ID"
                                    name="parentId"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织排序',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_parentId}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item
                                    label="部门简介"
                                    name="profiles"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="部门排序"
                                    name="sort"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入部门排序',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </div>
                            :
                            <div>
                                {
                                    modalTitle === '新增下级' ?
                                        <Form.Item
                                            label="上级部门"
                                            name="upName"
                                            style={{ marginBottom: 25 }}
                                            initialValue={redact_upName}
                                        >
                                            <Input disabled={true} />
                                        </Form.Item>
                                        :
                                        ''
                                }
                                <Form.Item
                                    label="部门名称"
                                    name="orgName"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入部门名称',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_name}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="部门编码"
                                    name="orgCode"
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_coding}
                                >
                                    <Input disabled={true} />
                                </Form.Item>

                                <Form.Item
                                    label="部门类型"
                                    name="orgType"
                                    initialValue={redact_type}>
                                    <Radio.Group value={redact_type}>
                                        <Radio value={1}> 组织 </Radio>
                                        <Radio value={2}> 部门 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="部门简介"
                                    name="profiles"
                                    initialValue={redact_profiles}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="父ID"
                                    name="parentId"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织排序',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_parentId}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item
                                    label="部门排序"
                                    name="sort"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织排序',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_sort}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </div>
                    }

                </Form>
            </Modal>
        </div>
    );
}

export default modal;