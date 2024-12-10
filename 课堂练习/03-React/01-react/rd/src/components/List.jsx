import { Component } from "react";
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            arrData  :['张三','李四','王五']
        }

    }
    changeArr() {
        this.state.arrData.push('哈哈哈')
        this.setState({
            arrData:this.state.arrData
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
