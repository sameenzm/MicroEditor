/**
 * @file button
 * @author Sameen
 * @date 2016-9-29
 */

import React from 'react';

export default class extends React.Component {
    render() {
        const {value, className, onClick} = this.props;
        return (
            <button className={className + ' btn-style'} onClick={onClick}>{value}</button>
        );
    }
}
