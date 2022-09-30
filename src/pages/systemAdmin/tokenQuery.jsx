import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import jwt_decode from 'jwt-decode'

const { TextArea } = Input;

function tokenQuery() {

    const [tokenInp, setTokenInp] = useState('');

    useEffect(() => {

    }, []);

    const onChange = (e) => {
        console.log(e.target.value);
        if (e.target.value != '') {
            var token = e.target.value
            var decoded = JSON.stringify(jwt_decode(token), null, 4);
            console.log(decoded);
            setTokenInp(decoded); 
        }
    }

    return (
        <div style={{background:'white',padding:15}}>
            <div style={{ display: 'flex' }}>
                <div style={{width:'40%',marginRight:20}}>
                    <h1>Token</h1>
                    <TextArea style={{ height: 790, color:'#00b9f1' }} rows={4} onPressEnter={onChange} placeholder='请输入token' />
                </div>
                <div style={{width:'40%'}}>
                    <h1>PAYLOAD:DATA</h1>
                    <TextArea style={{ height: 790, color:'#d63aff' }} rows={4} value={tokenInp} />
                </div>
            </div>
        </div>
    )
}

export default tokenQuery;