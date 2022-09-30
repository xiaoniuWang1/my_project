
// 用户管理

import api from '@/util/api';
import { Input, Tree, Button, Col, DatePicker, Drawer, Form, Row, Select, Space, TreeSelect, Checkbox, message, Switch } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import request from 'umi-request';
import './index.css'

const { TreeNode } = TreeSelect;
const { Option } = Select;
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;
  const children = [];

  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });

    if (i < y) {
      children.push(key);
    }
  }

  if (_level < 0) {
    return tns;
  }

  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);
const dataList = [];

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({
      key,
      title: key,
    });

    if (node.children) {
      generateList(node.children);
    }
  }
};

generateList(defaultData);

const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

// 异步加载人员名称
const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }

    return node;
  });

const userAdmin = () => {
  // 右下角保存按钮
  const [disabled, setDisabled] = useState('disabled');

  // 左边法院列表
  const [expandedKeys1, setExpandedKeys1] = useState([]);
  const [searchValue1, setSearchValue1] = useState('');
  const [autoExpandParent1, setAutoExpandParent1] = useState(true);
  const [treeData, setTreeData] = useState([]);


  // leftTree
  var [displayName, setDisplayName] = useState([]);
  var [checkboxValue, setCheckboxValue] = useState([]);
  var [userid, setUserid] = useState([]);

  // rightTree
  var [permissions, setPermissions] = useState([]);
  var [permissionsValue, setPermissionsValue] = useState([]);


  // 个人信息
  var [name, setName] = useState('');
  var [userName, setUserName] = useState('');
  var [mobile, setMobile] = useState('');
  var [enabled, setEnabled] = useState('');
  var [fyName, setFyName] = useState('');
  var [deptName, setDeptName] = useState('');
  var [targetName, setTargetName] = useState('');
  var [userDisabled, setUserDisabled] = useState(true);
  var [checkboxDisabled, setCheckboxDisabled] = useState(true);
  var [hyId,setHyId] = useState('');

  var [defaultChecked, setDefaultChecked] = useState(false);
  const fyId = counterStore.fyId;

  // 初始化左侧tree
  useEffect(() => {
    console.log(counterStore.fyId);
    if (fyId) {
      // 获取列表信息
      initialize();
    }
    // 获取角色和权限
    api.getAfterLogin().then((res) => {
      console.log(res);
      setDisplayName(res);
    })
    api.getPermissions().then((res) => {
      setPermissions(res);
    })
  }, [])

  // 获取左侧列表
  const initialize = () => {
    api.getDeptTree(fyId).then((res) => {
      console.log(res);
      setTreeData(res);
    })
  }

  // 左边法院列表
  // 点击下拉--展开
  const onExpand1 = (newExpandedKeys, node) => {
    setExpandedKeys1(newExpandedKeys);
    setAutoExpandParent1(false);
    console.log(newExpandedKeys, node);
    if (node.node.type === 'user') {
      api.getUserTree(newExpandedKeys).then((res) => {
        console.log(res);
      })
    }
  };

  // 点击人员获取人员信息
  const onSelect1 = (selectedKeys, e) => {
    console.log(selectedKeys, e);
    if (e.node.type === 'user') {
      const usersName = e.node.title.split(':')[1];
      api.getUsersMessage(usersName).then((res) => {
        console.log(res);
        // 保存人员信息
        setDefaultChecked(res.enabled);
        counterStore.user = res;
        setName(res.name);
        setUserName(res.username);
        setMobile(res.mobile);
        if (res.enabled) {
          setEnabled('是');
        } else {
          setEnabled('否');
        }
        setHyId(res.id);
        setFyName(res.fyName);
        setDeptName(res.departmentName);
        setTargetName(res.targetName);
        setUserDisabled(false);
        setCheckboxDisabled(false)
        // 保存人员角色和权限
        if (res.roles.length > 0) {
          let roles = res.roles;
          let userDisplayName = []
          roles.map((item) => {
            userDisplayName.push(item.displayName);
          })
          setCheckboxValue(userDisplayName);
          let perValue = []
          for (let i = 0; i < displayName.length; i++) {
            for (let j = 0; j < userDisplayName.length; j++) {
              if (displayName[i].displayName === userDisplayName[j]) {
                displayName[i].permissions.map((item) => {
                  perValue.push(item.displayName)
                })
                setPermissionsValue(perValue)
              }
            }
          }
        } else {
          setCheckboxValue([]);
          setPermissionsValue([]);
        }
      })
    }
  };

  // 异步加载获取数据
  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      // 获取人员列表
      api.getUserTree(key).then((res) => {
        if (res && res.length > 0) {
          const list = res.map((u) => {
            return { ...u, key: "user" + u.key }
          })

          setTreeData((origin) => {
            return updateTreeData(origin, key, list);
          });
        }

      })
      resolve();
    });

  // 搜索表单
  const onChange = (e) => {
    const { value } = e.target;
    console.log(value);
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys1(newExpandedKeys);
    setSearchValue1(value);
    setAutoExpandParent1(true);
  };

  // 搜索表单
  const treeData1 = useMemo(() => {
    const loop = (data) =>
      treeData.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(searchValue1);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue1.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue1}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );

        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
          };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [searchValue1]);

  // 抽屉
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  // 打开抽屉--修改人员信息
  const showDrawer = () => {
    setVisible(true);
    console.log(permissionsValue);
  };

  // 打开抽屉--修改密码
  const showDrawer1 = () => {
    setVisible1(true);
    console.log(permissionsValue);
  };

  // 关闭抽屉柜
  const onClose = (value) => {
    setVisible(false);
    console.log(value);
  };
  const onClose1 = (value) => {
    setVisible1(false);
    console.log(value);
  };

  // 表单提交--人员信息
  const onFinish = (values) => {
    console.log('Success:', values);
    const dept = values.departmentId;
    const departmentId = dept.value;
    const departmentName = dept.label;
    let params = { ...counterStore.user, ...values, departmentId, departmentName };
    delete params.enabled;
    delete params.usingMfa;
    delete params.email;
    api.putUsersById(params).then((res) => {
      console.log(res);
      if (res.id !== null) {
        message.success('修改成功');
        setVisible(false);
        counterStore.user = res;
        setName(res.name);
        setUserName(res.username);
        setMobile(res.mobile);
        setFyName(res.fyName);
        setDeptName(res.departmentName);
        setTargetName(res.targetName);
      }
    })
  };

  // 提交修改密码
  const onFinish1 = (values) => {
    console.log(values);
    api.putResetPasswordInit(counterStore.user.id, values).then((res) => {
      console.log(res);
      setVisible1(false)
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishFailed1 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 树形输入框
  const [value, setValue] = useState(undefined);

  const treeSelectChonge = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  }

  // 角色管理多选框
  const checkboxChange = (checkedValues) => {
    console.log(checkedValues);
    let perValue = []
    let userId = []
    for (let i = 0; i < displayName.length; i++) {
      for (let j = 0; j < checkedValues.length; j++) {
        if (displayName[i].displayName === checkedValues[j]) {
          userId.push(displayName[i].id)
          displayName[i].permissions.map((item) => {
            perValue.push(item.displayName);
          })
          setPermissionsValue(perValue)
        }
      }
    }
    setUserid(userId)

    if (checkedValues.length === 0) {
      setPermissionsValue([])
    }
    setCheckboxValue(checkedValues);
    setDisabled('')
  };
  const checkboxChange1 = (checkedValues) => {
    console.log(checkedValues);
  }

  // 点击保存
  const onClick = () => {
    console.log('保存成功');
    setDisabled('disabled');
    console.log(counterStore.user);
    api.putUsersRoles(counterStore.user.username, userid).then((res) => {
      console.log(res);
      if (res) {
        message.success('修改成功')
      }
    })
  };

  // 开关--点击修改
  const isEnabled = (checked, event) => {
    console.log(checked, event);
    api.putUsersEnabled(counterStore.user.username).then((res) => {
      console.log(res);
      setEnabled(res.enabled);
      setDefaultChecked(checked);
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', height: 800 }}>
        <div style={{ width: '25%', marginRight: 10, background: 'white', paddingTop: 20 }}>
          {/* <Search
            style={{
              marginBottom: 8,
            }}
            placeholder="搜索"
            onChange={onChange}
          /> */}
          <Tree
            onExpand={onExpand1}
            expandedKeys={expandedKeys1}
            autoExpandParent={autoExpandParent1}
            treeData={treeData}
            onSelect={onSelect1}
            loadData={onLoadData}
            height={760}
          />
          {/* <Tree loadData={onLoadData} treeData={treeData} /> */}
        </div>
        <div style={{ flex: 1, background: 'white' }}>
          <div className='user-box'>
            <div className='user-title'>个人信息</div>
            <div>华宇ID：<span>{hyId}</span></div>
            <div>姓名：<span>{name}</span></div>
            <div>用户名：<span>{userName}</span></div>
            <div>电话：<span>{mobile}</span></div>
            <div>是否生效：<span>{enabled ? enabled ? '是' : '否' : '否'}</span></div>
            <div>所属法院：<span>{fyName}</span></div>
            <div>所属部门：<span>{deptName}</span></div>
            <div>指标考核对象名称：<span>{targetName}</span></div>
            <div style={{ float: 'right' }}>
              <div style={{ marginBottom: 35 }}>
                <Button id='btn' type="primary" onClick={showDrawer} disabled={userDisabled} >
                  修改信息
                </Button>
              </div>
              <div>
                <Button type="primary" onClick={showDrawer1} disabled={userDisabled} >
                  修改密码
                </Button>
              </div>
              <div>
                <Switch checkedChildren='是' unCheckedChildren='否' checked={defaultChecked} onChange={isEnabled} />
              </div>
            </div>
            <Drawer
              title="修改个人信息"
              width={720}
              onClose={onClose}
              visible={visible}
              bodyStyle={{
                paddingBottom: 80,
              }}
              extra={
                <Space>
                  <Button onClick={onClose}>取消</Button>
                </Space>
              }
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
                  remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="姓名"
                  name="name"
                  initialValue={counterStore.user.name}
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
                  label="用户名"
                  name="username"
                  initialValue={counterStore.user.username}
                  rules={[
                    {
                      required: true,
                      message: '请填写用户名',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="电话"
                  name="mobile"
                  initialValue={counterStore.user.mobile}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="所属部门"
                  name="departmentId"
                  // initialValue={counterStore.user.departmentName}
                  rules={[
                    {
                      required: true,
                      message: '请选择所属部门',
                    },
                  ]}
                >
                  <TreeSelect
                    style={{
                      width: '100%',
                    }}
                    // value={counterStore.user.departmentName}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: 'auto',
                    }}
                    labelInValue={true}
                    treeData={treeData}
                    onChange={treeSelectChonge}
                    fieldNames={{ label: 'title', value: 'key' }}
                  />
                </Form.Item>

                <Form.Item
                  label="考核指标对象名称"
                  name="targetName"
                  initialValue={counterStore.user.targetName}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>

            <Drawer
              title="修改用户密码"
              width={720}
              onClose={onClose1}
              visible={visible1}
              bodyStyle={{
                paddingBottom: 80,
              }}
              extra={
                <Space>
                  <Button onClick={onClose}>取消</Button>
                </Space>
              }
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
                  remember: false,
                }}
                onFinish={onFinish1}
                onFinishFailed={onFinishFailed1}
                autoComplete="off"
              >
                <Form.Item
                  label="新密码"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </div>
          <div style={{ display: 'flex', height: '45%', paddingTop: 20 }}>
            <div
              style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <div>
                <h3>角色管理</h3>
                <Checkbox.Group disabled={checkboxDisabled} value={checkboxValue} onChange={checkboxChange} >
                  {
                    displayName.map((item, index) => {
                      return (
                        <div key={item.id}>
                          <Checkbox value={item.displayName}>{item.displayName}</Checkbox>
                        </div>
                      )
                    })
                  }
                </Checkbox.Group>
              </div>
            </div>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
              <div>
                <h3>权限管理</h3>
                <Checkbox.Group disabled value={permissionsValue} onChange={checkboxChange1} >
                  {
                    permissions.map((item, index) => {
                      return (
                        <div key={index}>
                          <Checkbox value={item.displayName}>{item.displayName}</Checkbox>
                        </div>
                      )
                    })
                  }
                </Checkbox.Group>
              </div>
            </div>
          </div>
          <div style={{ float: 'right', padding: 20 }}>
            <Button type="primary" disabled={disabled} onClick={onClick}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userAdmin;
