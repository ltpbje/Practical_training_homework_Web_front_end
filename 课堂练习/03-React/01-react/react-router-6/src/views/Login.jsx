import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Login(props) {
    const navigate = useNavigate();
    const checkLogin = () => {
        props.changeLoginState();
        navigate(-1);
    };
    return (
        <div>
            Login
            <button onClick={checkLogin}>登录</button>
        </div>
    );
}


const mapStateToProps = state => {
    // 映射全局状态isLogin
    return {
        isLogin: state.isLogin
    };
};
const mapDispatchToprops = dispatch => {
    return {
        changeLoginState() {
            let action = {
                type: 'changeLoginState'
            };
            dispatch(action);
        }
    };
};
export default connect(mapStateToProps, mapDispatchToprops)(Login);