import React, { Component } from 'react';

class Son1 extends Component {

    render() {
        return (
            <div>
                <h2>子组件1:{this.props.userName}</h2>
                <button onClick={this.props.changeData.bind(this)}>子组件1按钮</button>
            </div>
        );
    }
}
class Son2 extends Component {

    render() {
        return (
            <div>
                <h2>子组件2:{this.props.userName}</h2>
                <button onClick={this.props.changeData.bind(this)}>子组件2按钮</button>
            </div>
        );
    }
}

const HOCfunc = (newName, Comp) => {
    return class extends Component {
        state = {
            userName: 'zhangsan'
        };
        changeData() {
            this.setState({
                userName: newName
            });
        }
        render() {
            return (
                <Comp userName={this.state.userName} changeData={this.changeData.bind(this)}></Comp>
            );
        }

    };
};
let Child1 = HOCfunc('lisi', Son1);
let Child2 = HOCfunc('wangwu', Son2);
export default class Hoc extends Component {
    render() {
        return (
            <div>
                <Child1></Child1>
                <hr />
                <Child2></Child2>

            </div>
        );
    }
};
