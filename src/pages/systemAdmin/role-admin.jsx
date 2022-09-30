
// 角色权限管理

import React, { useEffect, useMemo, useState } from 'react';
import request from 'umi-request';
import { Tree, Radio, Space, Checkbox, Button, message } from 'antd';
import api from '../../util/api'

const roleAdmin = () => {
    const [disabled, setDisabled] = useState('disabled'); //保存按钮禁用启用
    const [role, setRole] = useState([]); //角色列表
    const [permissions, setPermissions] = useState([]); //权限列表
    const [permissions_displayName, setPermissions_displayName] = useState([]);
    const [permissionIds, setPermissionIds] = useState([]);
    var [checkboxDisabled, setCheckboxDisabled] = useState(true); //权限列表禁用启用

    useEffect(() => {
        initialize();
        // 获取权限列表
        api.getPermissions().then((res) => {
            console.log(res);
            setPermissions(res);
        })
    }, [])

    // 获取角色列表
    const initialize = () => {
        api.getRoles().then((res) => {
            console.log(res);
            setRole(res);
        })
    }

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        setCheckboxDisabled(false)
        let perDisName = [];
        for (let i = 0; i < role.length; i++) {
            if (role[i].id === e.target.value) {
                if (role[i].permissions.length > 0) {
                    console.log(role[i].permissions);
                    role[i].permissions.map((item) => {
                        perDisName.push(item.displayName)
                    })
                }
            }
        }
        console.log(perDisName);
        setPermissions_displayName(perDisName);
    };

    const checkboxChange = (checkedValues) => {
        setDisabled('');
        console.log(checkedValues);
        let checkValue = checkedValues;
        let permissionsId = [];
        console.log(permissions);
        for (let i = 0; i < permissions.length; i++) {
            for (let j = 0; j < checkedValues.length; j++) {
                if (checkedValues[j] === permissions[i].displayName) {
                    permissionsId.push(permissions[i].id);
                }
            }
        }
        console.log(permissionsId);
        setPermissions_displayName(checkValue);
        setPermissionIds(permissionsId);
    }

    const onClick = () => {
        setDisabled('disabled');
        api.putPermissions(value,permissionIds).then((res) => {
            if(res){
                message.success('修改成功')
                console.log(res);
                initialize();
            }
        })
    };

    return (
        <div style={{background:'white',padding:'30px 50px', height:'100%'}}>
            <div style={{marginBottom:80,borderBottom:'1px solid #f6f6f6'}}><h1>角色权限管理</h1></div>
            <div style={{ display: 'flex',height:'80%' }}>
                <div style={{background:'white',padding:20,marginRight:10,width:'20%',border:'1px solid #F0F2F9'}}>
                    <Radio.Group onChange={onChange}>
                        <Space direction="vertical">
                            {
                                role.map((item) => {
                                    return (
                                        <Radio key={item.id} value={item.id}>{item.displayName}</Radio>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>
                </div>
                <div style={{background:'white',padding:20,width:'20%',border:'1px solid #F0F2F5'}}>
                    <Checkbox.Group disabled={checkboxDisabled} value={permissions_displayName} onChange={checkboxChange} >
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
            <div style={{float:'right'}}>
                <Button type="primary" disabled={disabled} onClick={onClick}>
                    保存
                </Button>
            </div>
        </div>
    )
}

export default roleAdmin;
