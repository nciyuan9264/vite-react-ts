import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";

const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/ThreeJs" />
        },
        {
            path: "/ThreeJs",
            element: <ThreeJs />
        },
        {
            path: "/PixiJs",
            element: <PixiJs />
        },
    ])
    return routes
}
export default GetRouters;