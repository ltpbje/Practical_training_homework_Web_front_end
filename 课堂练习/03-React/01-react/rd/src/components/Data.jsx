import { Component } from "react";

export default class Data extends Component{
    constructor() {
        super()
        this.state = {
            textVal:'用户名'
        }
    }
    valChange(e) {
        this.setState({
            textVal:e.target.value
        })
    }
    render() {
        return (
            <>
                <input type="text" name="" id="" placeholder={this.state.textVal} onChange={this.valChange.bind(this)} /> 
                <p>{ this.state.textVal}</p>
            </>
        )
    }
}