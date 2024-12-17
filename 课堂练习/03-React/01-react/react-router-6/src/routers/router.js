import routers from "./";
import { BrowserRouter as Router, useRoutes, Navigate, useLocation, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
const AppRouter = (props) => {

    const location = useLocation();
    const { pathname } = location;
    const { isLogin } = props;
    // let isLogin = false;//表示是否有登录
    const RouteNav = router => {
        return (
            router.map(item => {
                return (
                    <>
                        <Route
                            path={item.path}
                            element={item.path === pathname && item.auth && !isLogin ? <Navigate to='/login'></Navigate> : item.element}
                            key={item.path}
                        >
                            {
                                item.children && RouteNav(item.children)
                            }
                        </Route>

                    </>
                );
            })
        );
    };
    return (
        <Routes>
            {
                RouteNav(routers)
            }
        </Routes>
    );
};

const mapStateToProps = state => {
    // 映射全局状态isLogin
    return {
        isLogin: state.isLogin
    };
};
export default connect(mapStateToProps)(AppRouter);
