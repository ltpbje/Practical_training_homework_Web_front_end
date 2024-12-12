import { Component } from "react";


export default class Ref extends Component{

    printDom() {
        console.log(this.htmlElement);
        
    }
    render() {
        return (
            <>
                <input type="text" ref={ref=> this.htmlElement = ref} />
                <button onClick={this.printDom.bind(this)}>按钮</button>
            </>
        );
    }
}