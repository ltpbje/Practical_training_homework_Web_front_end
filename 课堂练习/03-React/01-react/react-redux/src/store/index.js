import { createStore } from "redux";//导入创建store实例的方法
import reducer from "./reducer";//导入要在实例中引入使用的数据
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());//创建store实例，然后引入reducer的方法



export default store;
