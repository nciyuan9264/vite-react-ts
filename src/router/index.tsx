import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";

const GetRouters = () => {
    const routes: RouteObject[] = useRoutes([
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
    ]) as any;
    return routes
}
export default GetRouters;