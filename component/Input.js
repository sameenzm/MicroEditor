/**
 * @file 输入框
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
// import '../dep/font-awesome/css/font-awesome.min.css';

export default class extends React.Component {
    render() {
        const {className, placeholder} = this.props;
        return (
            <div className={'input-main ' + className}>
                <input type="text" className="search-input"
                placeholder={placeholder}/>
                <i className="fa fa-search search-icon" aria-hidden="true"></i>
            </div>
        );
    }
}
