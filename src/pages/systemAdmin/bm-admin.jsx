
// 部门管理

import api from '@/util/api';
import { Input, Tree, Button, Col, DatePicker, Drawer, Form, Row, Select, Space, TreeSelect, Checkbox, message, Switch } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import './index.css'

const bmAdmin = () => {

    // 左边法院列表
    const [expandedKeys1, setExpandedKeys1] = useState([]);
    const [autoExpandParent1, setAutoExpandParent1] = useState(true);
    const [treeData, setTreeData] = useState([]);


    // 个人信息
    var [name, setName] = useState('');
    var [hyId, setHyId] = useState('');

    const fyId = counterStore.fyId;

    // 初始化左侧tree
    useEffect(() => {
        if (fyId) {
            // 获取列表信息
            initialize();
        }
    }, [])

    // 获取左侧列表
    const initialize = () => {
        api.getDeptTree(fyId).then((res) => {
            res.map((item) => {
                if (item.children) {
                    item.children.map((key) => {
                        if (key.children) {
                            return
                        } else {
                            key.isLeaf = true;
                        }
                    })
                } else {
                    item.isLeaf = true;
                }
            })
            setTreeData(res);
        })
    }

    // 左边法院列表
    // 点击下拉--展开
    const onExpand1 = (newExpandedKeys, node) => {
        setExpandedKeys1(newExpandedKeys);
        setAutoExpandParent1(false);
    };

    // 点击部门获取部门信息
    const onSelect1 = (selectedKeys, e) => {
        setHyId(e.node.key);
        setName(e.node.title);
    };

    return (
        <div>
            <div style={{ display: 'flex', height: 800 }}>
                <div style={{ width: '25%', marginRight: 10, background: 'white', paddingTop: 20 }}>
                    <Tree
                        onExpand={onExpand1}
                        expandedKeys={expandedKeys1}
                        autoExpandParent={autoExpandParent1}
                        treeData={treeData}
                        onSelect={onSelect1}
                        height={760}
                    />
                </div>
                <div style={{ flex: 1, background: 'white' }}>
                    <div className='user-box'>
                        <div className='user-title'>部门信息</div>
                        <div>华宇ID：<span>{hyId}</span></div>
                        <div>名称：<span>{name}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default bmAdmin;
