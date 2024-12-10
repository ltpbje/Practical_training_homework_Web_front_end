import React from 'react';
import ReactDOM from 'react-dom/client'; //导入用于创建虚拟节点的对象
import './index.css'; //导入全局样式
import App from './App';//导入项目的根组件app
// import reportWebVitals from './reportWebVitals';//导入性能指标
//将public目录中的index.html中的id为root的元素作为react的挂载区域
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 创建一个div元素
let HtmlDom = document.createElement("div");//创建原生DOM
// 创建一个React元素
let ReactDOM1 = React.createElement('div');//创建react虚拟DoM
for (let i in HtmlDom) {
  console.log("原生DOM", i);

}
for (let i in ReactDOM1) {
  console.log("react虚拟DOM", i);

}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
