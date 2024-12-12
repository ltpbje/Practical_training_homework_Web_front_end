import { Component } from "react";
export default class ErrorComp extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            error: false //error用来表示当前错误边界组件是否捕获到错误
        }
    }
    // static  getDerivedStateFromError(error) {
    //     console.log( error);
    //     return {
    //         error: true,
            
    //     }
        
    // }

    componentDidCatch(error,info) {
        console.log(error, info);
        this.setState({  //通过setState修改内部状态（于之前的return其实是一样的效果）
            error: error,
            text: info.componentStack //把错误信息路径赋值给text
        })
        
    }
    render() {
        if (this.state.error) {
            return (
                <p>我是错误{ this.state.text}</p>
            )
        } else {
            return (
                <Child></Child>
            )
        }
    }
    // componentDidCatch(error, info) {
        
    // }
}

class Child extends Component{
    componentDidMount() {
        throw new Error('错误')
    }
    render() {
        return (
            <div>child</div>
        )
    }
}