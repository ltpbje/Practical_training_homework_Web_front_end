import { Component } from "react";

export default class Two extends Component{
    constructor() {
        super();
        this.state = {
            num:10
        }
    }
     changeNum () {
        // // this.state.num++;
        //  this.setState({
        //     num: this.state.num + 1
        //  }, () => {
        //      console.log(this.state.num);
        // })
         this.setState((state,props) => {
            //这里可以写一些需要执行的语句
             return {
                num :state.num + 1
            }
         }, () => {
             console.log(this.state.num);
            
        })
        
    } 
    render() {
        return (
            <>
                <p>{ this.state.num }</p>
                <button onClick={this.changeNum.bind(this)}>按钮</button>
            </>

        )
    }
}