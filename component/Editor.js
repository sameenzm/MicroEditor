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
            edtVal: [],
            editorRows: 18
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
            edtVal: props.value,
            editorRows: props.rows
        });
    }
    componentDidUpdate() {
        // this.props.reference(this.refs.wholeEditor);
    }
    handleTextChange(e) {
        let edt = this.refs.myEditor;
        let rows = edt.value.split(/[\n\r]/g).length;
        if (rows < 18) {
            rows = 18;
        }
        this.setState({
            editorRows: rows
        });
        let textArr = e.target.value.split(/[\n\r]/g);
        this.setState({edtVal: textArr});
        this.props.onChange(textArr, rows);
    }

    getBLen(str) {
        if (str == null) {
            return 0;
        }
        if (typeof str !== 'string') {
            str += '';
        }
        return str.replace(/[^\x00-\xff]/g, '01').length;
    }

    render() {
        let items = [];
        let lineMax = this.props.lineMax;
        let edtval = this.state.edtVal;
        if (!edtval.length) {
            items.push(<div key="1">1</div>);
        }
        else {
            for (let i = 0; i < edtval.length; i++) {
                if (this.getBLen(edtval[i]) > lineMax) {
                    items.push(<div key={i + 1} style={{color: 'red'}}>{i + 1}</div>);
                }
                else {
                    items.push(<div key={i + 1}>{i + 1}</div>);
                }
            }
        }
        return (
            <div className="editor-main" id="editor-main" ref="wholeEditor">
                    <textarea
                        ref="myEditor"
                        wrap="off"
                        name="editor" id="editor"
                        rows={this.state.editorRows}
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
