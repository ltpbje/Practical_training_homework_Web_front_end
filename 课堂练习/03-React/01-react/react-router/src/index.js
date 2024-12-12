import React from 'react';
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import './index.css'; //导入全局样式
import App from './App';//导入项目的根组件app
//将public目录中的index.html中的id为root的元素作为react的挂载区域
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Unmount></Unmount>
// );
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

