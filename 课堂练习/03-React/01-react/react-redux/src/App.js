import './App.css';
// import Routers from './router';
import { Component } from 'react';
import Page1 from './views/Page1';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
class App extends Component {

  render() {
    return (
      <div className="App">
        <Page1></Page1>
      </div>

    );
  }
}

export default App;
