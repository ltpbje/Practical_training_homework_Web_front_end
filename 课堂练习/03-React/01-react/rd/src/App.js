import './App.css';
import Home from './home';
// import One from './components/one';
// import Two from './components/two';
// import SetState from './components/SetState';
// import Data from './components/Data.jsx';
import List from './components/List';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
function App() {
  return (
    <div className="App">
      <Home></Home>
      {/* <One></One> */}
      {/* <Two></Two> */}
      {/* <hr /> */}
      {/* <SetState></SetState> */}
      <hr />
      {/* <Data></Data> */}
      <List></List>
    </div>
  );
}


export default App;
