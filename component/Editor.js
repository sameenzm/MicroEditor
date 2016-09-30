/**
 * @file 编辑器
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
import './style/style.css';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            line: 1,
            edtVal: []
        };
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            edtVal: this.props.value
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            edtVal: props.value
        });
    }

    handleTextChange(e) {
        let newText = e.target.value.split(/[\n\r]/g);
        this.setState({edtVal: newText});
        this.props.onChange(newText);
    }

    render() {
        let items = [];
        items.push(<div key="1">1</div>);
        for (let i = 1; i < this.state.edtVal.length; i++) {
            items.push(<div key={i + 1}>{i + 1}</div>);
        }

        return (
            <div className="editor-main">
                <textarea
                    name="editor" id="editor"
                    onChange={e => {
                        this.handleTextChange(e);
                    }}
                    value={this.state.edtVal.join('\n')}
                    >
                </textarea>
                <div className="gutter">
                    <div className="line-number">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}
