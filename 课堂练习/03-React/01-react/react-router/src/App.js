import './App.css';
import Routers from './router';
import { Component } from 'react';


//这个App函数就时组件本体，这种写法就是所谓JSX语法
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  UNSAFE_componentWillMount() {
    if (window.location.pathname === '/') {
      window.location.href = '/home/shops';
    }

  }

  render() {
    return (
      <div className="App">
        <Routers></Routers>
      </div>

    );
  }
}

export default App;
