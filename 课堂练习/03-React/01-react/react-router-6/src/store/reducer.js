const defaultState = {
    isLogin: false
};


export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'changeLoginState':
            newState.isLogin = true;
            break;
        default:
            break;

    }
    return newState;
};