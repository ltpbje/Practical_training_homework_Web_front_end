//reducer文件中只负责两件事
// 1、声明默认状态
//2、导出一个修改状态的函数
//defaultState默认全局状态

const defaultState = {
    msg: 'hello',
    arr: ['张三', 'lisi', 'wangwu'],
    textVal: ""
};


export default (state = defaultState, action) => {
    if (action.type === 'textVal') {
        state.textVal = action.value;
    }
    else if (action.type === 'arr') {
        state.arr.unshift(state.textVal);
        state.textVal = '';
    }
    return state;
};