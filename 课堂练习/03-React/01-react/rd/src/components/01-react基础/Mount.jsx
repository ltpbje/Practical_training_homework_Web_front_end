import { Component } from "react";
export default class Mount extends Component{
    constructor(props) {
        super(props);
        console.log("1、初始化");
    }
  UNSAFE_componentWillMount() {
        console.log("2、挂载之前");
        
    }
    render() {
        console.log('页面结构渲染');
        
        return (
            <>
                <div></div>
            </>

        )
    }
    componentDidMount(){
        console.log('挂载之后');
        
    }
}