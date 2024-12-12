import { Component } from "react";

export default class Father extends Component{
    state = {
        fatherVal:"hello"
    }
    changeVal(e) {
        this.setState({
            fatherVal : e.target.value
        })
    }
    render() {
        return (
            <div>
                父组件:<input value={this.state.fatherVal} onChange={this.changeVal.bind(this)}>
                </input>
                 <Son textVal={this.state.fatherVal} changeVal={this.changeVal.bind(this)}></Son>
            </div>
        )
    }
}


class Son extends Component {
    state = {
        sonVal:this.props.textVal
    }
    changeSonVal(e) {
        this.setState({
            sonVal:e.target.value
        })
    }
    render() {
        return (
            <div>
                <h2>子组件:{ this.state.sonVal}</h2>
            <input type="text" value={this.state.sonVal} onChange={this.props.changeVal.bind(this)} />

            </div>
        )
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            sonVal: nextProps.textVal
        }
    }
}