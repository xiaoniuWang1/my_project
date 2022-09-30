import React, { useState, useEffect } from 'react';
import { Button, message, Upload, DatePicker, Select, Form, Input } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import './index.css'

const { Option } = Select;

let token = sessionStorage.getItem('cm-authenticationToken');

const props = {
    name: 'file',
    action: '/statistics/api/upload/huayu-gy-fg',
    headers: {
        version: 'v1',
        Authorization: 'Bearer ' + token
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    },

    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
};
const props2 = {
    name: 'file',
    action: '/statistics/api/upload/casesituation',
    headers: {
        version: 'v1',
        Authorization: 'Bearer ' + token
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    },

    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
};
const props4 = {
    name: 'file',
    action: '/statistics/api/upload/casestdhxf',
    headers: {
        version: 'v1',
        Authorization: 'Bearer ' + token
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    },

    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
};
function filesUpload() {
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState('disabled');
    const [type, setType] = useState('');
    const [dateMonth, setDateMonth] = useState('');

    let btnType = '';
    let btnDate = '';
    const handleChange = (value) =>{
        console.log(value);
        btnType = value;
        setType(value);
        if(btnType == '' && btnDate == ''){
            setDisabled('disabled');
            console.log(2);
        }else{
            setDisabled(false);
        }
    }

    const onChange = (date, dateString) => {
        btnDate = dateString;
        console.log(btnDate);
        if(btnType == '' && btnDate == ''){
            setDisabled('disabled');
            console.log(1);
        }else{
            setDisabled(false);
        }
        setDateMonth(dateString)
    };

    const props3 = {
        name: 'file',
        action: `/statistics/api/upload/gy-inform/${type}/${dateMonth}`,
        headers: {
            version: 'v1',
            Authorization: 'Bearer ' + token
        },

        onChange(info) {
            console.log(info);
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },

        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
        <div className='filesUploadBox'>
            <div>
                <div className='filesUpload-box' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        高院改判发回案件上传 ： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>上传</Button>
                        </Upload>
                    </div>
                    <a href="/statistics/api/static/高院改判发回案件上传文件模板.xls">下载模板</a>
                </div>
                <div className='filesUpload-box' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        全省法院办案进度统计 ： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Upload {...props2}>
                            <Button icon={<UploadOutlined />}>上传</Button>
                        </Upload>
                    </div>
                    <a href="/statistics/api/static/全省法院办案进度统计模板.xls">下载模板</a>
                </div>
                <div className='filesUpload-box' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        执行信访信息上传 ： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Upload {...props4}>
                            <Button icon={<UploadOutlined />}>上传</Button>
                        </Upload>
                    </div>
                    <a href="/statistics/api/static/执行信访案件上传模板——交办法院（最高院）.xls">下载模板</a>
                </div>
                <div className='filesUpload-box' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{marginBottom:15, color:'#bbb'}}>要求数据行从第6行开始，每个指标均有排名、指标值、得分三项。</div>
                        省院通报上传 ： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Select
                            placeholder="请选择"
                            style={{
                                width: 120,
                                marginRight:10
                            }}
                            onChange={handleChange}
                        >
                            <Option value="基层">基层</Option>
                            <Option value="中院">中院</Option>
                            <Option value="辖区">辖区</Option>
                        </Select>
                        <DatePicker style={{marginRight:10}} allowClear={false} onChange={onChange} picker='month'></DatePicker>
                        <Upload {...props3}>
                            <Button disabled={disabled} icon={<UploadOutlined />}>上传</Button>
                        </Upload>
                    </div>
                    <a href="/statistics/api/static/全省法院办案进度统计模板.xls">下载模板</a>
                </div>
            </div>
        </div>
    )
}

export default filesUpload