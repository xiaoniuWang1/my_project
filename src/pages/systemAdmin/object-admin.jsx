
// 系统管理--对象管理

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Tree, Form, Button, Select, TreeSelect, Checkbox, Row, Col, message, Space, Drawer, } from 'antd';
import api from '@/util/api';
import { PlusOutlined } from '@ant-design/icons'


const { Search } = Input;
const { Option } = Select;

function objectAdmin() {

    const [treeData, setTreeData] = useState([]);
    const [treeDataFy, setTreeDataFy] = useState([]);
    const [treeDataBm, setTreeDataBm] = useState([]);

    useEffect(() => {
        allData();
        bmData();
        fyData()
    }, []);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
        setInp_disabled(true);
        setIs_xg('');
        setIs_tj('none');
        setTitle(title === '修改人员信息' ? '人员信息' : '部门信息');
    };

    const onClose = () => {
        setOpen(false);
    };

    // 全部法院部门法官
    const allData = () => {
        let fyArr = [];
        let bmArr = [];
        let fgArr = [];
        api.targetsLogin().then((res) => {
            console.log(res);
            res.data.map((item) => {
                if (item.category === '法院') {
                    item.key = item.fyId;
                    item.title = item.name;
                    fyArr.push(item)
                }
                if (item.category === '部门') {
                    item.key = item.hyId;
                    item.title = item.name;
                    bmArr.push(item)
                }
                if (item.category === '法官') {
                    item.key = item.id;
                    item.title = item.name;
                    fgArr.push(item)
                }
            });
            bmArr.map((bmItem) => {
                bmItem.children = [];
                fgArr.map((fgItem) => {
                    if (fgItem.fyId === bmItem.fyId && fgItem.sptsName === bmItem.name) {
                        bmItem.children.push(fgItem)
                    }
                })
            });
            fyArr.map((fyItem) => {
                fyItem.children = [];
                bmArr.map((bmItem) => {
                    if (bmItem.fyId === fyItem.fyId) {
                        fyItem.children.push(bmItem)
                    }
                })
            })
            setTreeData(fyArr);
        })
    }

    // 部门
    const bmData = () => {
        let fyArr = [];
        let bmArr = [];
        api.targetsLogin().then((res) => {
            console.log(res);
            res.data.map((item) => {
                if (item.category === '法院') {
                    item.key = item.hyId;
                    item.title = item.name;
                    fyArr.push(item)
                }
                if (item.category === '部门') {
                    item.key = item.hyId;
                    item.title = item.name;
                    bmArr.push(item)
                }
            });
            fyArr.map((fyItem) => {
                fyItem.children = [];
                bmArr.map((bmItem) => {
                    if (bmItem.fyId === fyItem.fyId) {
                        fyItem.children.push(bmItem)
                    }
                })
            });
            console.log(fyArr);
            setTreeDataBm(fyArr);
        })
    };

    // 法官
    const fyData = () => {
        let fyArr = [];
        api.targetsLogin().then((res) => {
            res.data.map((item) => {
                if (item.category === '法院') {
                    item.key = item.fyId;
                    item.title = item.name;
                    fyArr.push(item)
                }
            });
            console.log(fyArr);
            setTreeDataFy(fyArr);
        })
    }

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    var [id, setId] = useState(0);
    var [disabled, setDisabled] = useState(true);
    var [title, setTitle] = useState('信息列表');
    var [inp_disabled, setInp_disabled] = useState(true);
    // var [btn_disabled, setBtn_disabled] = useState(true);
    var [is_xg, setIs_xg] = useState('none')
    var [is_tj, setIs_tj] = useState('none')
    const [add_tree, setAdd_tree] = useState([]);

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
        console.log(newExpandedKeys);
    };

    // 点击人员获取人员信息
    const onSelect = (selectedKeys, e) => {
        console.log(e);
        if (e.node.category === '法官') {
            setId(e.node.id);
            setTitle('人员信息');
            // setBtn_disabled(false);
            setInp_disabled(true);
            setIs_xg('');
            setIs_tj('none');
            formRef.current.setFieldsValue({
                name: e.node.name,
                phones: e.node.phones,
                fyName: e.node.fyName,
                sptsName: e.node.sptsName,
                category: e.node.category,
                courtLevel: e.node.courtLevel,
                fyId: e.node.fyId,
                hyId: e.node.hyId,
                hyPId: e.node.hyPId,
                lineBelong: e.node.lineBelong,
                sort: e.node.sort,
                sptsId: e.node.sptsId,
            })
        }
        if (e.node.category === '法院') {
            setInp_disabled(true);
            // setBtn_disabled(true);
            setTitle('法院信息');
            setIs_xg('none');
            setIs_tj('none');

            // setDisabled(true);
            // setId(e.node.id);
            formRef.current.setFieldsValue({
                name: e.node.name,
                fyName: e.node.fyName,
                sptsName: e.node.sptsName,
                category: e.node.category,
                courtLevel: e.node.courtLevel,
                fyId: e.node.fyId,
                hyId: e.node.hyId,
                hyPId: e.node.hyPId,
                lineBelong: e.node.lineBelong,
                sort: e.node.sort,
                sptsId: e.node.sptsId,
            })
        }
        if (e.node.category === '部门') {
            console.log(e.node);
            setId(e.node.id);
            setTitle('部门信息');
            // setBtn_disabled(false);
            setInp_disabled(true);
            setIs_xg('');
            setIs_tj('none');
            formRef.current.setFieldsValue({
                name: e.node.name,
                fyName: e.node.fyName,
                sptsName: e.node.sptsName,
                category: e.node.category,
                courtLevel: e.node.courtLevel,
                fyId: e.node.fyId,
                hyId: e.node.hyId,
                hyPId: e.node.hyPId,
                lineBelong: e.node.lineBelong,
                sort: e.node.sort,
                sptsId: e.node.sptsId,
            })
        }
    };

    // 提交表单
    const onFinish = (values) => {
        console.log(values);
        if (values.fyName.label) {
            values.fyName = values.fyName.label;
        }
        if (values.sptsName) {
            values.sptsName = values.sptsName.label
        }
        if (values.lineBelong instanceof Array) {
            values.lineBelong = values.lineBelong.join('|')
        }
        if (values.sptsName === null) {
            values.sptsName = ''
        }
        if (values.sptsId === null) {
            values.sptsId = ''
        }
        if (values.sort === null) {
            values.sort = ''
        }
        if (title === '修改人员信息' || title === '修改部门信息') {
            values.id = id
            api.amendTarget(id, values).then((res) => {
                console.log(res);
                if (res.code === '00000') {
                    message.success('修改成功');
                    setInp_disabled(true);
                    allData();
                    setIs_tj('none');
                    setIs_xg('');
                    setTitle(title === '修改人员信息' ? '人员信息' : '部门信息');
                } else {
                    message.error('修改失败');
                }
            })
        }
    };

    const selectFy = (value) => {
        setAdd_tree([])
        console.log(treeData);
        console.log(value);
        treeData.map((item) => {
            if (item.name === value.label) {
                item.children.map((key) => {
                    delete key.children
                })
                setAdd_tree(item.children);
            }
        });
        add_formRef.current.setFieldsValue({
            fyId: value.value,
            hyPId: value.value
        })
    }

    const selectBm = (value) => {
        console.log(value);
        add_formRef.current.setFieldsValue({
            hyPId: value.value,
            sptsId: value.value
        })
    };

    const onGenderChange = (value) => {
        console.log(value);
        // if (value === '部门') {
        //     add_formRef.current.setFieldsValue({
        //         hyPId: value.value,
        //         sptsId: value.value
        //     })
        // }
    }


    // 添加部门或人员
    const add_Finish = (values) => {
        console.log(values);
        if (values.fyName.label) {
            values.fyName = values.fyName.label;
        }
        if (values.sptsName) {
            values.sptsName = values.sptsName.label
        }
        if (values.lineBelong instanceof Array) {
            values.lineBelong = values.lineBelong.join('|')
        }
        if (values.sptsName === null) {
            values.sptsName = ''
        }
        if (values.sptsId === null) {
            values.sptsId = ''
        }
        if (values.sort === null) {
            values.sort = ''
        }

        api.addTarget(values).then((res) => {
            console.log(res);
            if (res.code === '00000') {
                message.success('添加成功');
                setOpen(false);
                allData();
            } else {
                message.error('添加失败');
            }
        })

    };

    const formRef = useRef(null);
    const add_formRef = useRef(null);

    return (
        <div>
            <div style={{ display: 'flex', height: 800 }}>
                <div style={{ width: '25%', marginRight: 10, background: 'white', paddingTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'right', padding: '0px 10px', marginBottom: 10 }}>
                        <Space>
                            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                                添加
                            </Button>
                            <Drawer
                                title="添加部门或人员"
                                width={720}
                                onClose={onClose}
                                visible={open}
                                bodyStyle={{
                                    paddingBottom: 80,
                                }}
                            >
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: false,
                                    }}
                                    onFinish={add_Finish}
                                    autoComplete="off"
                                    ref={add_formRef}
                                >
                                    <Form.Item
                                        label="名称"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写姓名',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="电话"
                                        name="phones"
                                        rules={[
                                            {
                                                pattern: /^1[3-9]\d{9}$/,
                                                message: '请输入正确的电话'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="所属法院"
                                        name="fyName"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择所属法院',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            style={{
                                                width: '100%',
                                            }}
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                            }}
                                            labelInValue={true}
                                            treeData={treeDataFy}
                                            fieldNames={{ label: 'title', value: 'key' }}
                                            onChange={selectFy}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="所属部门"
                                        name="sptsName"
                                    >
                                        <TreeSelect

                                            style={{
                                                width: '100%',
                                            }}
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                            }}
                                            labelInValue={true}
                                            treeData={add_tree}
                                            // onChange={treeSelectChonge}
                                            fieldNames={{ label: 'title', value: 'key' }}
                                            onChange={selectBm}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="属性"
                                        name="category"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择属性',
                                            },
                                        ]}
                                    >
                                        <Select
                                            onChange={onGenderChange}
                                            allowClear
                                        >
                                            <Option value="法院">法院</Option>
                                            <Option value="部门">部门</Option>
                                            <Option value="法官">法官</Option>
                                            <Option value="助理">助理</Option>
                                            <Option value="书记员">书记员</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="法院层级"
                                        name="courtLevel"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择法院层级',
                                            },
                                        ]}
                                    >
                                        <Select
                                            // onChange={onGenderChange}
                                            allowClear
                                        >
                                            <Option value="3">中院</Option>
                                            <Option value="4">基层院</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="法院ID"
                                        name="fyId"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写法院ID',
                                            },
                                        ]}
                                    >
                                        <Input disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        label="华宇ID"
                                        name="hyId"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写华宇ID',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="华宇父ID"
                                        name="hyPId"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写华宇父ID',
                                            },
                                        ]}
                                    >
                                        <Input disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        name="lineBelong"
                                        label="所属条线"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择所属条线',
                                            },
                                        ]}
                                    >
                                        <Checkbox.Group>
                                            <Row>
                                                <Col span={6}>
                                                    <Checkbox
                                                        value="刑事"
                                                        style={{
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        刑事
                                                    </Checkbox>
                                                </Col>
                                                <Col span={6}>
                                                    <Checkbox
                                                        value="民事"
                                                        style={{
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        民事
                                                    </Checkbox>
                                                </Col>
                                                <Col span={6}>
                                                    <Checkbox
                                                        value="行政"
                                                        style={{
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        行政
                                                    </Checkbox>
                                                </Col>
                                                <Col span={6}>
                                                    <Checkbox
                                                        value="执行"
                                                        style={{
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        执行
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="排序"
                                        name="sort"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="审判庭室ID"
                                        name="sptsId"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 11,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </Drawer>
                        </Space>
                    </div>
                    <Tree
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        treeData={treeData}
                        height={760}
                        onSelect={onSelect}
                    />
                </div>
                <div style={{ flex: 1, background: 'white', padding: 30 }}>
                    <h1 style={{ textAlign: 'center' }}><b>{title}</b></h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                        ref={formRef}
                    >
                        <Form.Item
                            label="名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写姓名',
                                },
                            ]}
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            label="电话"
                            name="phones"
                            rules={[

                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '请输入正确的电话'
                                }
                            ]}
                            style={{ display: title === '人员信息' || title === '修改人员信息' ? '' : 'none' }}
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            label="所属法院"
                            name="fyName"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择所属法院',
                                },
                            ]}
                        >
                            <TreeSelect
                                disabled={inp_disabled}
                                style={{
                                    width: '100%',
                                }}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                labelInValue={true}
                                treeData={treeDataFy}
                                fieldNames={{ label: 'title', value: 'key' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="所属部门"
                            name="sptsName"
                        >
                            <TreeSelect
                                disabled={inp_disabled}
                                style={{
                                    width: '100%',
                                }}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                labelInValue={true}
                                treeData={treeDataBm}
                                // onChange={treeSelectChonge}
                                fieldNames={{ label: 'title', value: 'key' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="属性"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择属性',
                                },
                            ]}
                        >
                            <Select
                                disabled={inp_disabled}
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="法院">法院</Option>
                                <Option value="部门">部门</Option>
                                <Option value="法官">法官</Option>
                                <Option value="助理">助理</Option>
                                <Option value="书记员">书记员</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="法院层级"
                            name="courtLevel"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择法院层级',
                                },
                            ]}
                        >
                            <Select
                                disabled={inp_disabled}
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="3">中院</Option>
                                <Option value="4">基层院</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="法院ID"
                            name="fyId"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写法院ID',
                                },
                            ]}
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            label="华宇ID"
                            name="hyId"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写华宇ID',
                                },
                            ]}
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            label="华宇父ID"
                            name="hyPId"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写华宇父ID',
                                },
                            ]}
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            name="lineBelong"
                            label="所属条线"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择所属条线',
                                },
                            ]}
                        >
                            <Checkbox.Group disabled={inp_disabled}>
                                <Row>
                                    <Col span={6}>
                                        <Checkbox
                                            value="刑事"
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                        >
                                            刑事
                                        </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox
                                            value="民事"
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                        >
                                            民事
                                        </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox
                                            value="行政"
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                        >
                                            行政
                                        </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox
                                            value="执行"
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                        >
                                            执行
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item
                            label="排序"
                            name="sort"
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            label="审判庭室ID"
                            name="sptsId"
                        >
                            <Input disabled={inp_disabled} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 11,
                                span: 16,
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                                <Space>
                                    <Button style={{ display: is_xg }} type="primary" onClick={() => { setInp_disabled(false), setIs_tj(''), setIs_xg('none'), setTitle(title === '人员信息' ? '修改人员信息' : '修改部门信息') }}>修改</Button>
                                    <Button style={{ display: is_tj }} onClick={() => { setInp_disabled(true), setIs_tj('none'), setIs_xg(''), setTitle(title === '修改人员信息' ? '人员信息' : '部门信息') }}>取消</Button>
                                    <Button style={{ display: is_tj }} disabled={inp_disabled} type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Space>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default objectAdmin