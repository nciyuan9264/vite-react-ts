import React, { useEffect } from "react";
import Print from "./test";


const ThreeJs: React.FC = () => {


    useEffect(()=>{
        Print();
    },[])
    return(
        <div id="webgl-output">three</div>
    )
}
export default ThreeJs;