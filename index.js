/**
 * @file 入口文件
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MultiEditor from './MultiEditor';

ReactDOM.render(
    <MultiEditor
        selectArr={['毛利兰', '灰原哀', '江户川', '服部平次','sdfsdfsdf','erewr','ooo','dsf','sdf','sdfsf','werwer','wefvv']}
        value={['麦当劳好吃', 'KFC有点贵哦']}
        onChange={e => console.log('你们饿了没')}/>,
    document.getElementById('app')
);
