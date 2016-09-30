/**
 * @file 业务文件
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
import './component/style/style.css';

import Editor from './component/Editor';
import SelectCase from './component/SelectCase';
import Input from './component/Input';
import Button from './component/Button';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectArr: [],
            edtVal: []
        };
        this.sltArr = this.props.selectArr.slice(0);
    }

    componentWillMount() {
        this.setState({
            selectArr: this.props.selectArr,
            edtVal: this.props.value
        });
    }

    clearAll() {
        let sltArr = this.sltArr.slice(0);
        this.setState({
            selectArr: sltArr,
            edtVal: []
        });
    }

    changeText(text) {
        let newVal = this.state.edtVal;
        let selectVal = this.state.selectArr;
        let index = selectVal.indexOf(text);
        newVal.indexOf(text) < 0 && newVal.push(text);
        selectVal.splice(index, 1);
        this.setState({
            selectArr: selectVal,
            edtVal: newVal
        });
    }

    updateText(text) {
        this.setState({edtVal: text});
    }

    addAll() {
        let initVal = this.state.edtVal;
        let selectArr = this.state.selectArr;
        let newVal = initVal.concat(selectArr);
        this.setState({
            selectArr: [],
            edtVal: newVal
        });
    }

    render() {
        const onChange = this.props.onChange;
        return (
            <div className="multi-editor">
                <div className="left inline-block">
                    <div className="select-part inline-block">
                        <Input
                            placeholder="请输入关键字，系统将为您搜索相关推荐"
                            className="border-bottom"
                        />
                        <div className="explain border-bottom">
                            根据您的推广历史和行业分析，为您推荐相关关键词
                        </div>
                        <SelectCase
                            data={this.state.selectArr}
                            onSelect={e => this.changeText(e)}
                        />
                    </div>
                    <div className="state">
                        <span className="tips">注：你可以选择一个或多个对象</span>
                        <span className="operate"
                              onClick={e => this.addAll()}>添加全部</span>
                    </div>
                </div>

                <div className="arrow inline-block">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                </div>

                <div className="right inline-block">
                    <div className="editor-part inline-block">
                        <div className="count-words">已选关键词 ({this.state.edtVal.length}/200)</div>
                        <div className="explain">每行一个关键词，每个关键词最多40个字符</div>
                        <Editor
                            // ref="editor"
                            value={this.state.edtVal}
                            onChange={e => this.updateText(e)}
                        />
                    </div>
                    <div className="operate" onClick={e => this.clearAll()}>删除全部</div>
                </div>

                <div className="btns">
                    <Button
                        value="确定"
                        onChange={onChange}
                    />
                    <Button
                        value="取消"
                        className="cancel-btn"
                    />
                </div>
            </div>
        );
    }
}
