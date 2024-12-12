import { Component } from "react";
import './scroll.css'



export default class Scroll extends Component{
    state = {
        num:1
    }
    //当组件加载时设置一个定时器，4秒轴修改状态从而触发组件更新
    componentDidMount() {
        this.clearTime = setTimeout(() => {
            this.setState({
                num:2
            })
        }, 4000)
        console.log(this.wrap);
        
    }
    componentWillUnmount() {
        clearTimeout(this.clearTime)
    }
    render() {
        return (
            <div className="wrap" ref={ ref=>this.wrap = ref}>
                <div className="box1">111</div>
                <div className="box2">{ this.state.num}</div>

            </div>
        )
    }

    // 当开始更新时，将更新之前的wrap元素的scrollTop返回出去
    getSnapshotBeforeUpdate(prevProps,prevState) {
        return this.wrap.scrollTop
    }
    //在更新之后，通过componentDidupdate的第三个参数调出wrap元素更新之前的scrollTop值
    componentDidUpdate(prevProps,prevState,prevScrollTop) {
        this.wrap.scrollTop = prevScrollTop ;
    }
    // getDerivedStateFromError(error) {
        
    // }
    // componentDidCatch(error, info) {
        
    // }
}