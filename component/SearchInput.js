/**
 * @file 输入框
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
export default class extends React.Component {
    render() {
        const {className, placeholder, onKeyPress, onClick} = this.props;
        return (
            <div className={'input-main ' + className}>
                <input type="text" className="search-input"
                placeholder={placeholder}
                onKeyPress={onKeyPress}/>
                <i className="fa fa-search search-icon" aria-hidden="true"
                   onClick={onClick}></i>
            </div>
        );
    }
}
