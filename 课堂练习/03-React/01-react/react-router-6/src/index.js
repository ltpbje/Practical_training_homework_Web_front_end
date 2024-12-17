import React from 'react';
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import './index.css'; //导入全局样式
import App from './App';
import AppRouter from './routers/router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Unmount></Unmount>
// );
root.render(
  <Provider store={store}>
    <Router>
      <AppRouter></AppRouter>
    </Router>
  </Provider>


  // </React.StrictMode>
);

