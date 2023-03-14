import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';

function modal(props) {

    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称

    const [redact_userName, setRedact_userName] = useState(''); //姓名
    const [redact_email, setRedact_email] = useState(''); // 邮箱
    const [redact_phone, setRedact_phone] = useState(''); // 手机
    const [redact_telepHone, setRedact_telepHone] = useState(''); // 电话
    const [redact_sexDictText, setRedact_sexDictText] = useState(''); // 性别
    const [redact_statusDictText, setRedact_statusDictText] = useState(''); // 状态
    const [redact_workNo, setRedact_workNo] = useState(''); // 工号
    const [redact_profiles, setRedact_profiles] = useState(''); // 描述
    const [redact_sort, setRedact_sort] = useState(''); // 排序
    const [id, setId] = useState();

    const formRef = useRef(null);

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '编辑') {
            console.log(props.record);
            setId(props.record.id)
            setRedact_userName(props.record.name)
            setRedact_email(props.record.email)
            setRedact_phone(props.record.phone)
            setRedact_telepHone(props.record.telepHone)
            setRedact_sexDictText(props.record.sexDictText)
            setRedact_statusDictText(props.record.statusDictText)
            setRedact_workNo(props.record.workNo)
            setRedact_profiles(props.record.profiles)
            setRedact_sort(props.record.sort)
        } else if (props.title === '新增') {
            setRedact_userName('')
            setRedact_email('')
            setRedact_phone('')
            setRedact_telepHone('')
            setRedact_sexDictText('')
            setRedact_statusDictText('')
            setRedact_workNo('')
            setRedact_profiles('')
            setRedact_sort('')
        }
    }, [props.vis])

    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            console.log(values);
            let params = values;
            params.sex = params.sexDictText === '男' ? '0' : '1';
            params.status = params.statusDictText === '正常' ? '1' : '0';
            if (props.title === '编辑') {
                params.id = id
                props.onAmend(id, params);
            }
            if (props.title === '新增') {
                params.org = { id: props.orgId }
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
        <div style={{ height: '100%' }}>
            <Modal
                title={modalTitle}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
                width={'100%'}
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
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    ref={formRef}
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '姓名不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_userName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '邮箱不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的手机号',
                                pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_phone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="电话号"
                        name="telepHone"
                        rules={[
                            {
                                required: true,
                                message: '电话号不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_telepHone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="sexDictText"
                        rules={[
                            {
                                required: true,
                                message: '性别不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_sexDictText}
                    >
                        <Select
                            allowClear
                        >
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="状态"
                        name="statusDictText"
                        rules={[
                            {
                                required: true,
                                message: '状态不能为空',
                            },
                        ]}
                        style={{ marginBottom: 25 }}
                        initialValue={redact_statusDictText}
                    >
                        <Select
                            allowClear
                        >
                            <Option value="正常">正常</Option>
                            <Option value="异常">异常</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="工号"
                        name="workNo"
                        style={{ marginBottom: 25 }}
                        initialValue={redact_workNo}
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
                        name="profiles"
                        initialValue={redact_profiles}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default modal;