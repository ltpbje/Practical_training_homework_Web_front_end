import { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component{
    state = {
        num:1
    }
    
    render() {
        return (
            <>
                <h2>
                    Home
                </h2>
                <Link to='/home/shops'> shop</Link>
                <Link to='/home/order'> order</Link>
                <div>{this.props.children }</div>
            </>
        )
    }
}