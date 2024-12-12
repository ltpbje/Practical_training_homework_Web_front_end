import { Component } from "react";


export default class Shops extends Component{
    state = {
        num:1
    }
     goOrder() {
        //   console.log(this.props);
         this.props.history.push('/home/order');
    }
    render() {
        return (
            <div>
                <h2>
                    shops
                </h2>
                <button onClick={this.goOrder.bind(this)}>跳转到order</button>
            </div>
        )
    }
}