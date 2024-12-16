import store from './';
export default (type, value) => {
    let actions = {
        type,
        value
    };
    store.dispatch(actions);
};