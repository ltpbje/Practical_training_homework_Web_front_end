import { Component,createContext } from "react";
class GrandSon extends Component {

    render() {
        return (
            <>
                
                <FatherContext.Consumer>
                    {
                        fstr => <h2>{fstr}</h2>
                    }    
                  {/* <h2>{this.context.fstr}</h2> */}
                </FatherContext.Consumer>

            </>
        )
    }
}

class Son extends Component {
    render() {
        return (
            <>

                <GrandSon></GrandSon>
            </>

        )
    }
}

export default class Father extends Component{
    state= {
        str:'hahahha1fa'
    }
    componentWillMount() {
        console.log(111);
    }
    render() {
        return (
            <>
                <FatherContext.Provider value={this.state.str}>
                       <Son></Son>
                </FatherContext.Provider>
            </>


        )
    }
}

const FatherContext = createContext('light');
