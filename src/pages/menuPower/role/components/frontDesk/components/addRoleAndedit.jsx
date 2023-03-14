import React, { useState, useEffect, useRef } from 'react';
import { Input, Modal, Form, message } from 'antd';

function addRoleAndedit(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const formRef = useRef(null);

    const [redact_displayName, setRedact_displayName] = useState('');
    const [redact_roleName, setRedact_roleName] = useState('');
    const [redact_describe, setRedact_describe] = useState('');
    const [id, setId] = useState()

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '编辑') {
            setId(props.roleRecord.id)
            setRedact_displayName(props.roleRecord.displayName);
            setRedact_roleName(props.roleRecord.roleName);
            setRedact_describe(props.roleRecord.sort);
        };
        if (props.title === '新增') {
            setRedact_displayName('');
            setRedact_roleName('');
            setRedact_describe('');
        }
    }, [props.vis])

    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            console.log(values);
            let params = values;
            if (modalTitle === '编辑') {
                props.onRoleEdit(id, params)
            }
            if (modalTitle === '新增') {
                delete params.description
                props.onAddRole(params);
            }
        })
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
                        label="角色名称"
                        name="displayName"
                        rules={[
                            {
                                required: true,
                                message: '角色名称不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_displayName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="角色编码"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '角色编码不能为空',
                                pattern: "^[a-zA-Z0-9_]{3,50}$"
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_roleName}
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
        </div>
    );
}

export default addRoleAndedit;