import { Component } from "react";


export default class Pai extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textVal : "张三"
        }
    }
    changeVal() {
        this.setState({
            textVal:'lisi'
        })
    }
    render() {
        return (
            <div>
                <h2>父组件：{ this.state.textVal}</h2>
                <button onClick={this.changeVal.bind(this)}>修改父组件的state</button>
                <Son textVal={this.state.textVal} changeVal={this.changeVal.bind(this)}></Son>
            </div>

        )
    }
}


class Son extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sonVal : this.props.textVal //把父组件传递过来的textVal赋值给了子组件Son的内部状态sonVal上
        }
    }
    changeVal() {
        this.setState({
            sonVal:'lisi'
        })
    }
    render() {
        return (
            <div>
                <h2>子组件的state:{ this.state.sonVal}</h2>
                <h2>子组件的props:{this.props.textVal}</h2>
                <button onClick={this.changeVal.bind(this)}>修改子组件的state</button>
            </div>
        )
    }
 }
