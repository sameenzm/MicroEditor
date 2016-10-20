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
        value={['麦当劳好吃', 'KFC有点贵哦', '必胜客更贵啦',
                 '喜欢吃开心果', '爱吃牛肉干', '想吃橘子', '你们吃啥',
                  '广东吃甜的番茄炒蛋', '大坏蛋', 'homkai is a cheater！', 'homkai is a jerk！',
                  'how could you do this to me?']}
        onSubmit={e => console.log('你们饿了没')}
        maxWords={40}
        maxLines={10}
    />,
    document.getElementById('app')
);

