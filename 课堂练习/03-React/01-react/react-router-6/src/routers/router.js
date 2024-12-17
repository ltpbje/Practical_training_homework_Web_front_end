import routers from "./";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const AppRouter = () => {
    const GetRouter = () => useRoutes(routers);
    return (
        <Router>
            <GetRouter></GetRouter>
        </Router>
    );
};
export default AppRouter;
