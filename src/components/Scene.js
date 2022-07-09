import { useContext, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, useContextBridge } from "@react-three/drei";

import { DoughnutContext } from "../App";

function Scene() {
  const { width, height } = useWindowSize();

  const ContextBridge = useContextBridge(DoughnutContext);

  return (
    <div style={{ width: width, height: height }}>
      <Canvas>
        <ContextBridge>
          <color attach="background" args={["#fef3c7"]} />
          <Doughnut position={[200, 0, 0]} rotation={[0.25, 0, 0]} />
          <Doughnut position={[-200, 0, 0]} rotation={[0.5, 0, 10]} />
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
        </ContextBridge>
      </Canvas>
    </div>
  );
}

function Doughnut(props) {
  const doughnut = useRef();
  const [hovered, setHovered] = useState(false);
  const { nodes, materials, setColors } = useContext(DoughnutContext);

  setColors(Object.entries(materials).filter((item) => item[0].includes("Frosting")));

  useFrame((state, delta) => {
    doughnut.current.rotation.y += 0.015;
    doughnut.current.rotation.x += 0.002;
    doughnut.current.scale.x =
      doughnut.current.scale.y =
      doughnut.current.scale.z =
        THREE.MathUtils.lerp(doughnut.current.scale.x, hovered ? 1.2 : 1, 0.1);
  });

  return (
    <group
      {...props}
      dispose={null}
      ref={doughnut}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
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
      <DoughnutContext.Consumer>
        {(value) => (
          <mesh
            name="Frosting 0"
            geometry={nodes["Frosting 0"].geometry}
            material={materials[value.color]}
            castShadow
            receiveShadow
            position={[0.97, 28.23, 2.06]}
          />
        )}
      </DoughnutContext.Consumer>
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

export default Scene;
