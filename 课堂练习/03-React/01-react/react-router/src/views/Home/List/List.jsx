import { Component } from "react";
import {  Input, List } from "antd";
import store from "../../../store";
import './listData.css'
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
        let action = {
            type: 'textVal',
            value : e.target.value
        }
        store.dispatch(action)

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
        let action = {
            type:'arr'
        }
        store.dispatch(action)
        // this.setState({
        //     arr: this.state.arr,
        //     textVal:''//每次新值之后清除之前输入的内容
        // })
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
                        itemLayout="vertical"
                        bordered
                        dataSource={this.state.arr}
                        renderItem={(item) => (
                            <List.Item>
                                { item}
                            </List.Item>
                        )}
                        />

                </div>

            </div>
        )
    }
}