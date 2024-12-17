import routers from "./";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {
                    routers.map((item, index) => {
                        return (
                            <Route exact key={index} path={item.path} element={<item.component></item.component>}></Route>
                        );
                    })
                }
            </Routes>
        </Router>
    );
};
export default AppRouter;
