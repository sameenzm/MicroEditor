/**
 * @file 业务文件
 * @author Sameen
 * @date 2016-9-28
 */

import React from 'react';
import './component/style/style.css';

import Editor from './component/Editor';
import SelectCase from './component/SelectCase';
import SearchInput from './component/SearchInput';
import Button from './component/Button';
import ajax from './lib/ajax';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectArr: [],
            edtVal: this.props.value,
            beSelect: [],
            notice: '',
            noticeColor: {},
            editorRows: 18
        };
        this._sltArr = [];
        this._timeOutId = 0;
        this._editorRefer = null;
        this._turnToBottom = false;
    }

    clearAll() {
        let sltArr = this._sltArr.slice(0);
        this.setState({
            selectArr: sltArr,
            edtVal: [],
            beSelect: [],
            editorRows: 18
        });
    }

    changeText(text) {
        let newVal = this.state.edtVal;
        let selectVal = this.state.selectArr;
        let newBeSelect = this.state.beSelect;
        let index = selectVal.indexOf(text);

        if (newVal.length === 1 && newVal[0] === '') {
            newVal[0] = text;
        }
        else {
            newVal.indexOf(text) < 0 && newVal.push(text);
        }

        selectVal.splice(index, 1);
        newBeSelect.push(text);

        this.setState({
            selectArr: selectVal,
            edtVal: newVal,
            beSelect: newBeSelect,
            editorRows: newVal.length > 18 ? newVal.length : 18
        });
        this._turnToBottom = true;
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

    unique(arr) {
        let result = [];
        let hash = {};
        let times = 0;
        for (let i = 0; i < arr.length; i++) {
            if (!hash[arr[i]]) {
                result.push(arr[i]);
                hash[arr[i]] = true;
            }
            else {
                times++;
            }
        }
        return [result, times];
    }

    compareArr(beSlt, textArr) {

        if (!beSlt.length || !textArr.length) {
            return false;
        }

        let sltShouldAdd = beSlt.slice(0);
        let textCopy = textArr.slice(0);
        let beSltShouldRest = [];

        // 把sltCopy中和textCopy一样的项剔除（剩下就是textCopy没有的项）
        textCopy.forEach(function (itemB) {
            let index = sltShouldAdd.indexOf(itemB);
            if (index >= 0) {
                sltShouldAdd.splice(index, 1);// 删掉共有的，剩下就是textarea中该有却没有的，那beSlt中该删掉，slt中该加回
            }
        });
        // 找A有B有的项
        beSlt.forEach(function (item) {
            let index = sltShouldAdd.indexOf(item);
            if (index < 0) {
                beSltShouldRest.push(item);// beSlt中该留下的
            }
        });

        return [beSltShouldRest, sltShouldAdd];
    }

    onClickYesBtn() {
        let edtVal = this.state.edtVal.slice(0);
        let invalidNum = 0;
        for (let i = 0; i < edtVal.length; i++) {
            if (this.getBLen(edtVal[i]) > this.props.maxWords) {
                this.setState({
                    notice: '不可超过' + this.props.maxWords + '个字符',
                    noticeColor: {color: '#FD0000'}
                });
            }
            if (edtVal[i].trim() === '') {
                invalidNum++;
            }
        }
        let newEdt = edtVal.filter(function (item) {
            return item.trim() !== '';
        });
        let uniEdt = this.unique(newEdt);
        let totalInvalid = invalidNum + uniEdt[1] - 0;
        if (totalInvalid !== 0) {
            this.setState({
                notice: '已自动去除' + totalInvalid + '个无效（重复）的关键词',
                noticeColor: {color: '#1515fe'}
            });
        }
        if (uniEdt[0].length > this.props.maxLines) {
            this.setState({
                notice: '不可以超过' + this.props.maxLines + '个关键词',
                noticeColor: {color: '#FD0000'}
            });
        }
        this.setState({
            edtVal: uniEdt[0],
            editorRows: uniEdt[0].length > 18 ? uniEdt[0].length : 18
        });
    }

    updateText(textArr) {
        let beSlt = this.state.beSelect.slice(0);
        let sltArr = this.state.selectArr.slice(0);
        // textArr 中删了原来选的，所以改把删掉的加回到selectCase中
        // 如果有返回值，返回该留下的选项（留在beSelect里） 和 该删除的选项（加回selectArr里）
        let result = this.compareArr(beSlt, textArr);
        if (!result || !result[1].length) {
            // textArr 中手动敲出selectCase中的选项
            textArr.forEach(function (item) {
                let index = sltArr.indexOf(item);
                if (index >= 0) {
                    sltArr.splice(index, 1);
                    beSlt.push(item);
                }
            });
            this.setState({
                selectArr: sltArr,
                edtVal: textArr,
                beSelect: beSlt,
                editorRows: textArr.length > 18 ? textArr.length : 18
            });
        }
        else {
            let newSltArr = sltArr.concat(result[1]); //[...sltArr, ...result[1]]
            this.setState({
                selectArr: newSltArr,
                edtVal: textArr,
                beSelect: result[0],
                editorRows: textArr.length > 18 ? textArr.length : 18
            });
        }
    }

    addAll() {
        let initVal = this.state.edtVal.slice(0);
        let selectArr = this.state.selectArr.slice(0);
        let newVal = initVal.concat(selectArr);
        this.setState({
            selectArr: [],
            edtVal: newVal,
            beSelect: selectArr,
            editorRows: newVal.length > 18 ? newVal.length : 18
        });
        this._turnToBottom = true;
    }

    componentDidMount() {
        let the = this;
        ajax({
            url: 'http://localhost:3000/api/default',
            type: 'GET',
            success(res) {
                let json = JSON.parse(res);
                the.setState({
                    selectArr: json.data
                });
                the._sltArr = json.data.slice(0);
            },
            error(data) {
                alert('error...');
            }
        });
    }

    componentDidUpdate() {

        this._editorRefer = this.refs.editorMain.refs.wholeEditor;
        let isBottom = this.state.turnToBottom;
        if (isBottom) {
            let main = this.refs.editorMain;
            let edt = main.refs.myEditor;
            let len = edt.scrollHeight;
            this._editorRefer.scrollTop = len;
            this._turnToBottom = false;
        }
    }

    onClickSearch(e) {
        let the = this;
        let edtVal = this.state.edtVal.slice(0);
        let theE;

        e.target.previousSibling
            ? theE = e.target.previousSibling.value
            : theE = e.target.value;
        if (!theE) {
            ajax({
                url: 'http://localhost:3000/api/default',
                type: 'GET',
                success(res) {
                    let json = JSON.parse(res);
                    the.setState({selectArr: json.data});
                    the.updateText(edtVal);
                },
                error(data) {
                    alert('error...');
                }
            });
        }
        else {
            ajax({
                url: 'http://localhost:3000/api/search',
                type: 'GET',
                success(res) {
                    let json = JSON.parse(res);
                    the.setState({selectArr: json.data});
                    the.updateText(edtVal);
                },
                error(data) {
                    alert('error...');
                }
            });
        }
    }

    onEnter(e) {
        let the = this;
        // 兼容FF和IE和Opera
        let theEvent  = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            the.onClickSearch(theEvent);
        }
    }

    clearTime() {
        if (this._timeOutId) {
            clearTimeout(this._timeOutId);
        }
    }

    setTime() {
        const notice = this.state.notice;
        const color = this.state.noticeColor;
        if (!!notice || !!color) {
            this._timeOutId = setTimeout(() => {
                this.setState({
                    notice: '',
                    noticeColor: {}
                });
            }, 3000);
        }
    }

    render() {
        const onSubmit = this.props.onSubmit;
        return (
            <div className="multi-editor">
                <div className="left inline-block">
                    <div className="select-part inline-block">
                        <SearchInput
                            placeholder="请输入关键字，系统将为您搜索相关推荐"
                            className="border-bottom"
                            onKeyPress={e => this.onEnter(e)}
                            onClick={e => this.onClickSearch(e)}
                        />
                        <div className="explain border-bottom">
                            根据您的推广历史和行业分析，为您推荐相关关键词
                        </div>
                        <SelectCase
                            data={this.state.selectArr}
                            onSelect={e => {
                                this.changeText(e);
                            }}
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
                        <div className="count-words">已选关键词 ({this.state.edtVal.length}/{this.props.maxLines})</div>
                        <div className="explain">每行一个关键词，每个关键词最多{this.props.maxWords}个字符</div>
                        <Editor
                            ref="editorMain"
                            value={this.state.edtVal}
                            onChange={e => this.updateText(e)}
                            maxWords={this.props.maxWords}
                            rows={this.state.editorRows}
                        />
                    </div>
                    <div className="operate" onClick={e => this.clearAll()}>删除全部</div>
                </div>

                <div className="btns">
                    <Button
                        value="确定"
                        onClick={e => {
                            this.onClickYesBtn();
                            if (!this.state.notice) {
                                this.setTime();
                            }
                            else {
                                this.clearTime();
                                this.setTime();
                            }
                            onSubmit();
                        }}
                    />
                    <Button
                        value="取消"
                        className="cancel-btn"
                    />
                </div>
                <div className="notice">
                    <p onMouseEnter={e => {
                        this.clearTime();
                    }}
                       onMouseOut={e => this.setTime()}
                       style={this.state.noticeColor}>
                        {this.state.notice && '[提示]关键词：' + this.state.notice}
                    </p>
                </div>
            </div>
        );
    }
}
