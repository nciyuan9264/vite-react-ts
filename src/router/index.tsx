import { useRoutes, Navigate } from "react-router-dom";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";
import Algorithm from "../components/Algorithm"

const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/Algorithm" />
        },
        {
            path: "/Algorithm",
            element: <Algorithm />
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