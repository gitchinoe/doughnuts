import { useContext, useState } from "react";
import { useWindowSize } from "react-use";
import { usePopper } from "react-popper";
import { Menu } from "@headlessui/react";
import { Canvas } from "@react-three/fiber";
import { PaintBucket } from "phosphor-react";

import { DoughnutContext } from "../App";

function UI() {
  const { width, height } = useWindowSize();
  const { colors, color, setColor } = useContext(DoughnutContext);

  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
    placement: "top",
    modifiers: [{ name: "offset", options: { offset: [0, 16] } }],
  });

  return (
    <div
      className="absolute top-0 left-0 flex justify-center items-end p-8 pointer-events-none z-50"
      style={{ width: width, height: height }}
    >
      <nav className="flex bg-stone-800 text-white/60 rounded-md shadow-lg px-6 pointer-events-auto">
        <Menu>
          <Menu.Button
            ref={setReferenceElement}
            className="p-4 hover:text-white"
          >
            <PaintBucket weight="fill" size={32} />
          </Menu.Button>
          <Menu.Items
            className={`bg-stone-800 rounded-md flex flex-col divide-y divide-stone-600 overflow-hidden`}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {colors.map((item, idx) => (
              <Menu.Item
                as={"button"}
                className={`flex px-4 py-3 ${item[0] === color ? "bg-stone-700" : ''}`}
                key={item[0]}
                onClick={() => setColor(item[0])}
              >
                <div className="w-16 h-16">
                  <Canvas>
                    <mesh material={item[1]}>
                      <boxGeometry args={[2, 2, 2]} />
                    </mesh>
                  </Canvas>
                </div>
                {item[0]}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </nav>
    </div>
  );
}

export default UI;
