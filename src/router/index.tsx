import { useRoutes, Navigate } from "react-router-dom";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";
import PlanckJS from "../components/PlanckJS";
import React from "react";


const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/PixiJs" />
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
    ])
    return routes
}
export default GetRouters;