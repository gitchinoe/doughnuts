import { useWindowSize } from "react-use";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import useSpline from "@splinetool/r3f-spline";

function App() {
  const { width, height } = useWindowSize();

  document.body.style.margin = "0";

  return (
    <div style={{ width: width, height: height }}>
      <Canvas>
        <color attach="background" args={["#fef3c7"]} />
        <directionalLight
          name="Directional Light"
          color={"#fff"}
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[-804, 459, 53]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.05}
          color="#eaeaea"
          position={[0, 1, 0]}
        />
        <OrthographicCamera
          name="Personal Camera"
          makeDefault={true}
          far={100000}
          near={-100000}
          position={[-27.88, -30.73, 1004.73]}
          rotation={[0, -0.02, 0]}
        />
        <Doughnut position={[200, 0, 0]} rotation={[0.25, 0, 0]} />
        <Doughnut position={[-200, 0, 0]} rotation={[0.5, 0, 12]} />
      </Canvas>
    </div>
  );
}

function Doughnut(props) {
  const doughnut = useRef();
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/zvU684uvAnbFTTQe/scene.splinecode"
  );
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    doughnut.current.rotation.y += 0.015;
    //doughnut.current.rotation.x += 0.025;
    doughnut.current.scale.x =
      doughnut.current.scale.y =
      doughnut.current.scale.z =
        THREE.MathUtils.lerp(doughnut.current.scale.x, hovered ? 1.2 : 1, 0.1);
  });

  document.body.style.cursor = hovered ? "pointer" : "auto";

  return (
    <group
      {...props}
      dispose={null}
      ref={doughnut}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <mesh
        name="Torus 8"
        geometry={nodes["Torus 8"].geometry}
        material={materials["Torus 8 Material"]}
        castShadow
        receiveShadow
        position={[-30.6, 52.44, -144]}
        rotation={[-1.23, 0.39, 1.94]}
        scale={2}
      />
      <mesh
        name="Torus 7"
        geometry={nodes["Torus 7"].geometry}
        material={materials["Torus 7 Material"]}
        castShadow
        receiveShadow
        position={[141.06, 72.42, 2.07]}
        rotation={[-2.05, -0.33, -0.15]}
        scale={2}
      />
      <mesh
        name="Torus 6"
        geometry={nodes["Torus 6"].geometry}
        material={materials["Torus 6 Material"]}
        castShadow
        receiveShadow
        position={[-59.74, 58.69, -0.19]}
        rotation={[-1.52, 0.31, 2.24]}
        scale={2}
      />
      <mesh
        name="Torus 5"
        geometry={nodes["Torus 5"].geometry}
        material={materials["Torus 5 Material"]}
        castShadow
        receiveShadow
        position={[51.71, 79.48, 81.53]}
        rotation={[-2.05, -0.33, 0.4]}
        scale={2}
      />
      <mesh
        name="Torus 4"
        geometry={nodes["Torus 4"].geometry}
        material={materials["Torus 4 Material"]}
        castShadow
        receiveShadow
        position={[57.69, 54.84, 130.96]}
        rotation={[-0.88, 0.48, 1.79]}
        scale={2}
      />
      <mesh
        name="Torus 3"
        geometry={nodes["Torus 3"].geometry}
        material={materials["Torus 3 Material"]}
        castShadow
        receiveShadow
        position={[-90.78, 57.53, -125.84]}
        rotation={[-1.96, -0.67, 2.21]}
        scale={2}
      />
      <mesh
        name="Torus 2"
        geometry={nodes["Torus 2"].geometry}
        material={materials["Torus 2 Material"]}
        castShadow
        receiveShadow
        position={[63.7, 73.27, -108.41]}
        rotation={[-1.23, 0.39, 1.94]}
        scale={2}
      />
      <mesh
        name="Torus"
        geometry={nodes.Torus.geometry}
        material={materials["Torus Material"]}
        castShadow
        receiveShadow
        position={[-83.41, 69.41, 59.88]}
        rotation={[-Math.PI / 2, 0, 1.95]}
        scale={2}
      />
      <mesh
        name="Cylinder 2"
        geometry={nodes["Cylinder 2"].geometry}
        material={
          clicked
            ? materials["Cylinder 3 Material"]
            : materials["Cylinder 2 Material"]
        }
        castShadow
        receiveShadow
        position={[0.97, 28.23, 2.06]}
      />
      <mesh
        name="Cylinder"
        geometry={nodes.Cylinder.geometry}
        material={materials["Cylinder Material"]}
        castShadow
        receiveShadow
        position={[1, 0, 2]}
      />
    </group>
  );
}

export default App;
