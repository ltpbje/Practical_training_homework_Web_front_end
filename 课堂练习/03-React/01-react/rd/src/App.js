import './App.css';
import Home from './home';
import One from './components/one';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
function App() {
  return (
    <div className="App">
      <Home></Home>
      <One></One>
    </div>
  );
}


export default App;
