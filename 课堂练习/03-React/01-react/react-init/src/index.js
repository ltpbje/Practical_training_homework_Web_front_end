import React from 'react';
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import App from './App';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Unmount></Unmount>
// );
root.render(
  <App></App>

  // </React.StrictMode>
);

