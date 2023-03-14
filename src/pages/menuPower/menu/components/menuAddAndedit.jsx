import React, { useState, useEffect, useRef } from 'react';
import { Input, Modal, Form, message, Radio } from 'antd';

function menuAddAndedit(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称
    const formRef = useRef(null);

    const [redact_menuName, setRedact_menuName] = useState('');
    const [redact_menuType, setRedact_menuType] = useState('');
    const [redact_url, setRedact_url] = useState('');
    const [redact_permission, setRedact_permission] = useState('');
    const [redact_parentId, setRedact_parentId] = useState('');
    const [redact_icon, setRedact_icon] = useState('');
    const [redact_component, setRedact_component] = useState('');
    const [redact_path, setRedact_path] = useState('');
    const [redact_redirect, setRedact_redirect] = useState('');
    const [redact_sort, setRedact_sort] = useState('');
    const [id, setId] = useState();

    const [value, setValue] = useState('一级菜单');
    const options = [
        {
            label: '一级菜单',
            value: '1',
        },
        {
            label: '子菜单',
            value: '0',
        },
    ];

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '编辑') {
            console.log(props.record);
            setRedact_menuName(props.record.menuName);
            setRedact_menuType(props.record.menuType);
            setRedact_url(props.record.url);
            setRedact_permission(props.record.permission);
            setRedact_parentId(props.record.parentId);
            setRedact_icon(props.record.icon);
            setRedact_component(props.record.component);
            setRedact_path(props.record.path);
            setRedact_redirect(props.record.redirect);
            setRedact_sort(props.record.sort);
            setId(props.record.id)
        };
        if (props.title === '新增') {
            setRedact_menuName('');
            setRedact_menuType('');
            setRedact_url('');
            setRedact_permission('');
            setRedact_parentId('');
            setRedact_icon('');
            setRedact_component('');
            setRedact_path('');
            setRedact_redirect('');
            setRedact_sort('');
        }
    }, [props.vis])

    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            console.log(values);
            let params = values;
            if (modalTitle === '编辑') {
                params.id = id;
                props.onRedact(id, params);
            }
            if (modalTitle === '新增') {
                props.onAddMenu(params);
            }
        }).catch(reason => {
            message.warning('表单输入不允许为空，请检查');
        })
    };

    // 关闭新增Modal
    const handleCancel = () => {
        props.fn(false)
    };

    const onChange = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setRedact_menuType(value);
    };

    return (
        <div>
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
                    <Form.Item
                        label="菜单名称"
                        name="menuName"
                        rules={[
                            {
                                required: true,
                                message: '菜单名称不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_menuName}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="菜单类型"
                        name="menuType"
                        style={{ marginBottom: 25 }}
                        initialValue={redact_menuType}
                    >
                        <Radio.Group options={options} onChange={onChange} optionType="button" buttonStyle="solid" />
                    </Form.Item>

                    {
                        redact_menuType === '0' ?
                            <Form.Item
                                label="子菜单"
                                name="menuType"
                                style={{ marginBottom: 25 }}
                                initialValue={redact_menuType}
                            >
                                <Input />
                            </Form.Item>
                            :
                            ''
                    }

                    <Form.Item
                        label="菜单路径"
                        name="path"
                        initialValue={redact_path}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="菜单图标"
                        name="icon"
                        style={{ marginBottom: 25 }}
                        initialValue={redact_icon}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="排序"
                        name="sort"
                        style={{ marginBottom: 25 }}
                        initialValue={redact_sort}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default menuAddAndedit;