import { Component } from "react";


export default class Home extends Component{
    state = {
        num:1
    }
    render() {
        return (
            <>
                <h2>
                    Home
                </h2>
                <div>{this.props.children }</div>
            </>
        )
    }
}