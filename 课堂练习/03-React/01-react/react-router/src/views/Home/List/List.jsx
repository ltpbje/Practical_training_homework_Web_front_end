import { Component } from "react";
import {  Input, List } from "antd";
import store from "../../../store";
import './listData.css'
import { ARR, DEL, TEXT_VAL } from '../../../store/actionType'
import actionCreators from "../../../store/actionCreators";
export default class ListData extends Component{

    constructor(props) {
        super(props);
        // this.state = {
        //     arr: ['张三', 'lisi', 'wangwu'],
        //     textVal:""//设置textVal储存Input的value值
        // }
        this.state = {
            ...store.getState()
        }
        store.subscribe(this.viewChange.bind(this))
    }

    //制作获取Input的value值的方法，让其成为受控组件
    getInputVal(e) { 
        //使用dispatch方法必须要传入一个action对象，所以我们创建一个action对象
        // let action = {
        //     type: TEXT_VAL,
        //     value : e.target.value
        // }
        // store.dispatch(action)
        actionCreators(TEXT_VAL,e.target.value)
        // this.setState({
        //     textVal: e.target.value
        // })
       
    }

    viewChange() {  
        this.setState(store.getState())
    }

    //将每次Input输入的内容添加到arr数组的前面，从而实时渲染添加了新值的列表
    addItem() {
        // this.state.arr.unshift(this.state.textVal)
        // let action = {
        //     type:ARR
        // }
        // store.dispatch(action)
        actionCreators(ARR);
        // this.setState({
        //     arr: this.state.arr,
        //     textVal:''//每次新值之后清除之前输入的内容
        // })
    }


    delItem(index) {
        // let action = {
        //     type: DEL,
        //     value: index
        // };

        // store.dispatch(action);

        actionCreators(DEL,index)


    }
    render() {
        return (
            <div className="box">
                <div className="top">
                    <Input placeholder="Basic usage" value={this.state.textVal} onChange={this.getInputVal.bind(this)}></Input>
                    <button  className="m-l" type="primary" onClick={this.addItem.bind(this)}>添加内容</button>
                </div>            
                <div className="bottom">
                    <List
                  
                        bordered
                        dataSource={this.state.arr}
                        renderItem={(item,index) => (
                            <List.Item className="item-flex">
                                <span>{item}</span>
                            <button className="del-btn" onClick={this.delItem.bind(this,index)}>删除</button>    
                            </List.Item>
                        )}
                        />

                </div>

            </div>
        )
    }
}