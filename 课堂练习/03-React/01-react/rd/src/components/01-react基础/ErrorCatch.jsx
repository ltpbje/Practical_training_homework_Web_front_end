 import { Component } from "react";

export default class ErrorCatch extends Component { 
    constructor(props) {
        super();
        this.state = {
            error:null
        }
    }
    handleClick() {
        try {
            throw new Error('我是一个错误')
        } catch (error) {
            this.setState({
                error
            })
        }

    }
    render() {
        return (
            <div>
                {
                    this.state.error ? <p>{ '我是错误的'}</p> : <p>{ '我是正确的'}</p>
                }
                <button onClick={this.handleClick.bind(this)}>按钮</button>
            </div>

        )
    }

}