import { Component } from "react";


export default class SetState extends Component{
    constructor() {
        super();
        this.changeNum = this.changeNum.bind(this);
    }
    state = {
        num:1
    }
    changeNum() {
        this.state.num += 1;
        this.setState((state,props) => {
            console.log(state.num);
            return {
                num: state.num + 2
            }
            
        })
    }
    render() {
        return (
            <>
                <h2>{ this.state.num}</h2>
                <button onClick={this.changeNum}>按钮</button>
            </>
        )
    }
}