import './App.css';
// import Routers from './router';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';


//这个App函数就时组件本体，这种写法就是所谓JSX语法
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  UNSAFE_componentWillMount() {
    console.log(this.props);
    if (this.props.location.pathname === '/') {

      this.props.history.push('/home/shops');
    }

  }

  render() {
    return (
      <div className="App">
        <div>{this.props.children}</div>
      </div>

    );
  }
}

export default withRouter(App);
