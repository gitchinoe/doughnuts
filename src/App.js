import { createContext, useState } from "react";
import useSpline from "@splinetool/r3f-spline";

import UI from "./components/UI";
import Scene from "./components/Scene";

export const DoughnutContext = createContext({});

function App() {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/zvU684uvAnbFTTQe/scene.splinecode"
  );
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  let api = {
    nodes,
    materials,
    color,
    colors,

    /* Mutators */
    setColor,
    setColors,
  };

  

  return (
    <DoughnutContext.Provider value={api}>
      <UI />
      <Scene />
    </DoughnutContext.Provider>
  );
}

export default App;
