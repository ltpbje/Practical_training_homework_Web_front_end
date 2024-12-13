import { Component } from "react";


export default class Order extends Component{
    componentDidMount() {
        // console.log(this.props);
        // console.log(this.props.match.params);
        console.log(this.props);
        
    }
    state = {
        num:1
    }
    goBack() {
      
        
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <h2>
                    Order
                </h2>
                <button onClick={this.goBack.bind(this)}>返回</button>
            </div>
        )
    }
}