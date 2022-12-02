import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';

function modal(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [confirmLoading, setConfirmLoading] = useState(false);//新增确定时loding动画
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称

    const [redact_name, setRedact_name] = useState('');
    const [redact_coding, setRedact_coding] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const [redact_describe, setRedact_describe] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '编辑') {
            setRedact_name(props.record.name)
            setRedact_coding(props.record.coding)
            setRedact_sort(props.record.sort)
            setRedact_describe(props.record.name)
        } else if (props.title === '新增') {
            setRedact_name('')
            setRedact_coding('')
            setRedact_sort('')
            setRedact_describe('')
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
                width={'100%'}
                // height={'100%'}
                style={{
                    maxWidth: "100vw",
                    top: 0,
                    paddingBottom: 0
                }}
                bodyStyle={{
                    height: "calc(100vh - 55px - 53px)"
                }}
            >
                <Form
                    name="basic"
                    // labelCol={{
                    //     span: 8,
                    // }}
                    // wrapperCol={{
                    //     span: 16,
                    // }}
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
        </div>
    );
}

export default modal;