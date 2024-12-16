import { Component } from "react";
import { connect } from "react-redux";
class Page1 extends Component{
    
    
    //把原本的constructor和viewchange可以直接删除了
    // constructor() {
    //     super();
    //     //将全局状态导入到page1页面中的内部状态中
    //     // this.state = store.getState()
    //     //通过订阅监听store中num的变化，如果发生变化
    //     store.subscribe(this.viewChange.bind(this))
    // }
    // 获取store中的全局状态，并且实时同步到页面的虚拟DOM中
    // viewChange() {
    //     this.setState(store.getState());
    // }
    // toAdd() {
    //     let action = {
    //         type: 'toAdd',
    //     }
    //     store.dispatch(action)
    // }

    render() {
        return (
            <>
                <h2>{this.props.num }</h2>
                <button onClick={this.props.toAdd.bind(this)}>按钮</button>
            </>
        )
    }
}

//创建一个映射全局状态的函数， 该函数的参数会映射到reducer.js中的defaultState
const mapStateToProps = state => {
    // 这里return的匿名对象我们可以看成当前组件的内部状态
    return {
        num:state.num
    }
}
// /在映射dispatch的函数中，形参会被注入store中的dispatch方法
const mapDispatchToProps = dispatch => {
    return {
        toAdd() {
            let action = {
                type: 'toAdd',
            }
            dispatch(action)
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Page1);