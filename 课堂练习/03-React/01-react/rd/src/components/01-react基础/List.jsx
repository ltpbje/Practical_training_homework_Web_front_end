import { Component } from "react";
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            arrData  :['张三','李四','王五']
        }

    }
    changeArr() {
        //先调用原始的state中的数组进行修改
        this.state.arrData.push('哈哈哈')
        //将已经修改好的arrData进行序列化转换成字符串，然后再转回来成为一个数组赋值给newArr相当于创建了一个新数组，
        let newArr =JSON.parse(JSON.stringify(this.state.arrData))
        this.setState({
            arrData:newArr
        })
    }
    render() {
        return (
            <>
                <ul>
                {

                    this.state.arrData.map((item,index) => {
                        return (
                            <li key={ index}>{ item }</li>
                        )
                    })
                }
                </ul>
                <button onClick={this.changeArr.bind(this)}>按钮</button>
            </>
        )
    }
}
