/**
 * @file 添加功能块
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        // this.getItemText = this.getItemText.bind(this);
    }

    getItemText(e) {
        return e.target.parentNode.parentNode.firstChild.innerText;
    }

    render() {
        const the = this;
        const {data, onSelect} = this.props;
        return (
            <div className="select-case">
                <div className="items">
                    {
                        data.map(function (v, k) {
                            return <div key={k} className="item clearfix">
                                <span className="word">{v}</span>
                                <span
                                    className="add-icon"
                                    onClick={e => {
                                        let text = the.getItemText(e);
                                        onSelect(text);
                                    }}
                                ><i className="fa fa-plus" aria-hidden="true"></i></span>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}
