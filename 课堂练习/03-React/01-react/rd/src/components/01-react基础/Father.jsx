import { Component } from "react";

import defaultTypes from 'prop-types'; ///导入设置期望类型的对象
export default class Father extends Component {
    // 这里我们可以省略构造器，因为构造器主要时为了类的继承作用的，，但是我们这里的类式组件不存在继承关系
    state = {
        fatherData :'zhangsan'
    }
    changeFatherData() {
        this.setState({
            fatherData:'lisi'
        })
    }
    render() {
        return (
            <>
              {/* <Child num={this.state.fatherData}></Child> */}
                <h2>{ this.state.fatherData}</h2>
                <Child num={ this.state.fatherData} changeData={this.changeFatherData.bind(this) }></Child>
            </>
        )
    }
}




class Child extends Component {
    constructor(state,props) {
        super();
    }
    static propsTypes = {
        num : defaultTypes.number
    }
    //在子组件中可以通过定义静态属性的方式，定义props的默认值    
    static defaultProps = {
        // 默认值为50
        num:50
    }
    changeFatherData() {
        this.props.changeData();
   }
    render() {
        return (
            <>
                <h2>我是child组件</h2>
                <h2>{this.props.num}</h2>
                <button onClick={this.changeFatherData.bind(this)}>修改父组件</button>
            </>

            
        )
    }
}