import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, message, Radio, InputNumber } from 'antd';

function modal(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [confirmLoading, setConfirmLoading] = useState(false);//新增确定时loding动画
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const [redact_upName, setRedact_upName] = useState('');
    const [redact_name, setRedact_name] = useState('');
    const [redact_type, setRedact_type] = useState('');
    const [redact_coding, setRedact_coding] = useState('')
    const [redact_abbreviation, setRedact_abbreviation] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '新增下级') {
            setRedact_upName(props.record.name)
        }
        if (props.title === '编辑') {
            setRedact_upName(props.record.name);
            setRedact_name(props.record.name);
            setRedact_type(props.record.address);
            setRedact_coding(props.record.age);
            setRedact_sort(props.record.sort);
        }
    }, [props.vis])

    // 新增Modal确定
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            console.log(formRef);
            formRef.current.validateFields().then(values => {
                console.log(values);
                props.fn(false);
                setConfirmLoading(false);
            }).catch(reason => {
                message.warning('表单输入不允许为空，请检查');
                setConfirmLoading(false);

            })
        }, 2000);
    };

    // 关闭新增Modal
    const handleCancel = () => {
        props.fn(false)
    };

    return (
        <div style={{ height: '100%' }}>
            <Modal
                title={modalTitle}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
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
                                            label="上级组织"
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
                                    label="组织名称"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织名称',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="组织类型">
                                    <Radio.Group value={'组织'}>
                                        <Radio value="组织"> 组织 </Radio>
                                        <Radio value="部门"> 部门 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="组织缩写"
                                    name="sort"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="组织排序"
                                    name="coding"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织排序',
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
                                            label="上级组织"
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
                                    label="组织名称"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入组织名称',
                                        },
                                    ]}
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_name}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="组织编码"
                                    name="coding"
                                    style={{ marginBottom: 25 }}
                                    initialValue={redact_coding}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                                <Form.Item label="组织类型" initialValue={redact_type}>
                                    <Radio.Group value={redact_type}>
                                        <Radio value="组织"> 组织 </Radio>
                                        <Radio value="部门"> 部门 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="组织缩写"
                                    name="sort"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="组织排序"
                                    name="coding"
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