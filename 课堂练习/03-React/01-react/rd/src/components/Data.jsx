import { Component ,createRef} from "react";

export default class Data extends Component{
    constructor() {
        super()
        this.user = createRef()
        this.state = {
            textVal:'用户名'
        }
    }
    valChange(e) {
        // this.setState({
        //     textVal:e.target.value
        // })
        console.log(this.user);
        
    }
    render() {
        return (
            <>
                <input type="text" name="" id="" ref={this.user} placeholder={this.state.textVal} onChange={this.valChange.bind(this)} /> 
                <p>{ this.state.textVal}</p>
            </>
        )
    }
}