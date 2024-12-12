import './App.css';
import Routers from './router';
//这个App函数就时组件本体，这种写法就是所谓JSX语法
function App() {
  return (
    <div className="App">
      <Routers></Routers>
    </div>
  );
}

export default App;
