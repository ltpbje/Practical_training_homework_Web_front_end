import { Component } from "react";
import store from "../store";

export default class Page1 extends Component{
    constructor() {
        super();
        //将全局状态导入到page1页面中的内部状态中
        this.state = store.getState()
        //通过订阅监听store中num的变化，如果发生变化
        store.subscribe(this.viewChange.bind(this))
    }
    // 获取store中的全局状态，并且实时同步到页面的虚拟DOM中
    viewChange() {
        this.setState(store.getState());
    }
    toAdd() {
        let action = {
            type: 'toAdd',
        }
        store.dispatch(action)
    }

    render() {
        return (
            <>
                <h2>{this.state.num }</h2>
                <button onClick={this.toAdd.bind(this)}>按钮</button>
            </>
        )
    }
}