import { useRoutes, Navigate } from "react-router-dom";
import React from "react";
import ThreeJs from "../components/ThreeJs";
import PixiJs from "../components/PixiJs";
import PlanckJS from "../components/PlanckJS";


const GetRouters = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/PlanckJS" />
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