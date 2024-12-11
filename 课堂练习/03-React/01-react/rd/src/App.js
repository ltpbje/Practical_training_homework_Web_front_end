import './App.css';
// import Father from './components/Father';
// import Context from './components/Context';
import Mount from './components/Mount';
import UpdateFather from './components/UpdateFather';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
function App() {
  return (
    <div className="App">
      {/* <Home></Home> */}
      {/* <One></One> */}
      {/* <Two></Two> */}
      {/* <hr /> */}
      {/* <SetState></SetState> */}
      <hr />
      {/* <Data></Data> */}
      {/* <Father></Father> */}
      {/* <Context></Context> */}
      {/* <Mount></Mount> */}
      <UpdateFather></UpdateFather>
    </div>
  );
}

export default App;
