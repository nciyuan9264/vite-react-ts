import { useRoutes, Navigate } from "react-router-dom";
import React from "react";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";
import PlanckJs from "../components/PlanckJS";
import VisualizingQuaternions from "../components/VisualizingQuaternions";
import BabylonJs from "../components/BabylonJs"
const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/BabylonJs" />
        },
        {
            path: "/PlanckJS",
            element: <PlanckJs />
        },
        {
            path: "/ThreeJs",
            element: <ThreeJs />
        },
        {
            path: "/PixiJs",
            element: <PixiJs />
        },
        {
            path: "/VisualizingQuaternions",
            element: <VisualizingQuaternions />
        },
        {
            path: "/BabylonJs",
            element: <BabylonJs />
        }
    ])
    return routes
}
export default GetRouters;