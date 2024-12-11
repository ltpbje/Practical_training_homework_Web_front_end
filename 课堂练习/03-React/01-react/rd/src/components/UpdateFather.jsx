import { Component } from "react";

class Son extends Component{
    state = {
        str:'yoyo'
    }
    // props
    UNSAFE_componentWillReceiveProps(newProps) {
        console.log("0、接收到新的props", newProps);       
        return true;
    }
    // state
    UNSAFE_shouldComponentUpdate(newProps,newState) {
        console.log('1、是否开始更新',newProps,newState);
        return true
    }

    UNSAFE_componentWillUpdate() {
        console.log('2、准备开始跟新');
        
    }
    render() {
        console.log('3、重新渲染页面结构');
        return (
            <div>
                <h2>{ this.state.str}</h2>
                <button>更新state</button>
            </div>
        )

    }
    componentDidUpdate() {
        console.log('4、更新之后');
        
    }
    changeStr() {
        this.setState({
            str:'hhahah'
        })
    }
}



export default class UpdateFather extends Component{
    state = {
        num:1
    }
    changeNum() {
        this.setState({
            num : 2
        })
    }
    render() {
        return (
            <div>
                <h2>{ this.state.num}</h2>
                <button onClick={this.changeNum.bind(this)}>修改num</button>
                <Son num={ this.state.num}></Son>
            </div>
        )
    }
}
