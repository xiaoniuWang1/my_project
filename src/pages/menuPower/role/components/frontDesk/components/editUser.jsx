import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, message, Select, Tabs, Row, Col, DatePicker, Radio, Upload, Button, Table, Tree, Space } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Search } = Input;

const data = [
    {
        id: '123',
        name: '王五'
    }
];

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

function editUser(props) {

    // 编辑 modal
    const [open, setOpen] = useState(false);//新增的显示隐藏
    const [modalTitle, setModalTitle] = useState('');//显示modal title名称

    // 基础信息
    const [redact_userName, setRedact_userName] = useState(''); //姓名
    const [redact_email, setRedact_email] = useState(''); // 邮箱
    const [redact_orgName, setRedact_orgName] = useState(''); // 部门名称
    const [redact_phone, setRedact_phone] = useState(''); // 手机
    const [redact_telepHone, setRedact_telepHone] = useState(''); // 电话
    const [redact_sexDictText, setRedact_sexDictText] = useState(''); // 性别
    const [redact_statusDictText, setRedact_statusDictText] = useState(''); // 状态
    const [redact_workNo, setRedact_workNo] = useState(''); // 工号
    const [redact_profiles, setRedact_profiles] = useState(''); // 描述
    const [redact_sort, setRedact_sort] = useState(''); // 排序
    const [id, setId] = useState();
    // 上传头像
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    // 兼职部门 modal
    const [addDepartment, setAddDepartment] = useState(false);
    const [departmentTitle, setDepartmentTitle] = useState('');

    // 兼职部门 树
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const formRef = useRef(null);

    // 兼职部门 table
    const partTimeJobColumns = [
        {
            title: '部门名称',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: '职务名称',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { userDel(record) }}>删除</a>
                </Space>
            ),
        },
    ]
    // 部门职务选择 table
    const jobColumns = [
        {
            title: '职务名称',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: '职务编码',
            dataIndex: 'id',
            align: 'center'
        },
    ];

    useEffect(() => {
        setOpen(props.vis);
        setModalTitle(props.title);
        if (props.title === '编辑') {
            console.log(props.userRecord);
            // setRedact_userName(props.record.name)
            // setRedact_email(props.record.email)
            // setRedact_orgName(props.record.orgName)
            // setRedact_phone(props.record.phone)
            // setRedact_telepHone(props.record.telepHone)
            // setRedact_sexDictText(props.record.sexDictText)
            // setRedact_statusDictText(props.record.statusDictText)
            // setRedact_workNo(props.record.workNo)
            // setRedact_profiles(props.record.profiles)
            // setRedact_sort(props.record.sort)
        } else if (props.title === '新增') {
            // setRedact_userName('')
            // setRedact_email('')
            // setRedact_orgName('')
            // setRedact_phone('')
            // setRedact_telepHone('')
            // setRedact_sexDictText('')
            // setRedact_statusDictText('')
            // setRedact_workNo('')
            // setRedact_profiles('')
            // setRedact_sort('')
        }
    }, [props.vis])

    // 基础信息
    // 新增Modal确定
    const handleOk = () => {
        formRef.current.validateFields().then(values => {
            console.log(values);
            let params = values;
            if (props.title === '编辑') {
                params.id = id
                props.onAmend(id, params);
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

    const onSearch = () => {
        setAddDepartment(true);
        setDepartmentTitle('部门职务选择');
    };

    // 上传头像
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传头像
            </div>
        </div>
    );


    // 兼职部门
    // 新增Modal确定
    const partTimeJobOk = () => {
        // formRef.current.validateFields().then(values => {
        //     console.log(values);
        //     let params = values;
        //     if (props.title === '编辑') {
        //         params.id = id
        //         props.onAmend(id, params);
        //     }
        //     if (props.title === '新增') {
        //         props.onAdd(params)
        //     }
        // }).catch(reason => {
        //     message.warning('表单输入不允许为空，请检查');
        // })
        setAddDepartment(false);
    };

    // 关闭新增Modal
    const partTimeJobCancel = () => {
        setAddDepartment(false);
    };

    // 兼职部门 新增
    const showModal = () => {
        setAddDepartment(true);
        setDepartmentTitle('部门职务选择');
    };

    // 兼职部门 删除
    const userDel = (record) => {
        console.log('删除')
    };

    // 兼职部门选择树
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <div>
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab='基础信息' key='1'>
                        <Form
                            name="basic"

                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            ref={formRef}
                        >
                            <Row gutter={24}>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="登录账号"
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
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="姓名"
                                        name="profiles"
                                        initialValue={redact_profiles}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="主部门"
                                        name="orgName"
                                        rules={[
                                            {
                                                required: true,
                                                message: '部门名称不能为空',
                                            },
                                        ]}
                                        style={{ marginBottom: 25 }}
                                        initialValue={redact_orgName}
                                    >
                                        <Search
                                            onSearch={onSearch}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="工号"
                                        name="workNo"
                                        style={{ marginBottom: 25 }}
                                        initialValue={redact_workNo}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="角色分配"
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
                                        <Select
                                            mode="multiple"
                                            allowClear
                                        >
                                            <Option value='1'>123</Option>
                                            <Option value='2'>123</Option>
                                        </ Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="岗位分配"
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
                                            mode="multiple"
                                            allowClear
                                        >
                                            <Option value="产品经理">产品经理</Option>
                                            <Option value="开发">开发</Option>
                                            <Option value="销售">销售</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="排序"
                                        name="sort"
                                        initialValue={redact_sort}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="头像"
                                        name="sort"
                                        initialValue={redact_sort}
                                    >
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="avatar"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="员工密级"
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
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="生日"
                                        name="profiles"
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Form.Item
                                        label="QQ号"
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
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="电子邮件"
                                        name="profiles"
                                        initialValue={redact_profiles}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={1}>
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
                                </Col>
                                <Col span={10} offset={2}>
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
                                </Col>
                                <Col span={10} offset={1}>
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
                                </Col>
                                <Col span={10} offset={2}>
                                    <Form.Item
                                        label="是否实体用户"
                                        name=""
                                        initialValue={redact_profiles}
                                    >
                                        <Radio.Group>
                                            <Radio value={1}>是</Radio>
                                            <Radio value={2}>否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Modal
                            title={departmentTitle}
                            open={addDepartment}
                            onOk={partTimeJobOk}
                            onCancel={partTimeJobCancel}
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
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ width: '50%' }}>
                                    <h3>部门</h3>
                                    <div >
                                        <Tree
                                            checkable
                                            onExpand={onExpand}
                                            expandedKeys={expandedKeys}
                                            autoExpandParent={autoExpandParent}
                                            onCheck={onCheck}
                                            checkedKeys={checkedKeys}
                                            onSelect={onSelect}
                                            selectedKeys={selectedKeys}
                                            treeData={treeData}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3>职务</h3>
                                    <Table
                                        columns={jobColumns}
                                        rowKey={record => { return record.id }}
                                        dataSource={data}
                                        bordered
                                        style={{
                                            width: 500
                                        }}
                                        rowSelection={{
                                            type: 'radio'
                                        }}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </TabPane>
                    <TabPane tab='兼职部门' key='2'>
                        <div>
                            <Button style={{ marginBottom: 20 }} type="primary" onClick={showModal} icon={<PlusOutlined />}>新增</Button>
                            <Table
                                columns={partTimeJobColumns}
                                rowKey={record => { return record.id }}
                                dataSource={data}
                                bordered
                            />
                        </div>
                        <Modal
                            title={departmentTitle}
                            open={addDepartment}
                            onOk={partTimeJobOk}
                            onCancel={partTimeJobCancel}
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
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ width: '50%' }}>
                                    <h3>部门</h3>
                                    <div >
                                        <Tree
                                            checkable
                                            onExpand={onExpand}
                                            expandedKeys={expandedKeys}
                                            autoExpandParent={autoExpandParent}
                                            onCheck={onCheck}
                                            checkedKeys={checkedKeys}
                                            onSelect={onSelect}
                                            selectedKeys={selectedKeys}
                                            treeData={treeData}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3>职务</h3>
                                    <Table
                                        columns={jobColumns}
                                        rowKey={record => { return record.id }}
                                        dataSource={data}
                                        bordered
                                        style={{
                                            width: 500
                                        }}
                                        rowSelection={{
                                            type: 'radio'
                                        }}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </TabPane>
                </Tabs>

            </Modal>
        </div >
    );
}

export default editUser;