import React from 'react';
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import './index.css'; //导入全局样式
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Unmount></Unmount>
// );
root.render(
  <Provider store={store}>
    <App></App>

  </Provider>
  // </React.StrictMode>
);

