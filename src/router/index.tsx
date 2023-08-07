import { useRoutes, Navigate } from "react-router-dom";
import React from "react";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";
import PlanckJS from "../components/PlanckJS";
import VisualizingQuaternions from "../components/VisualizingQuaternions";

const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/VisualizingQuaternions" />
        },
        {
            path: "/PlanckJS",
            element: <PlanckJS />
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
        }
    ])
    return routes
}
export default GetRouters;