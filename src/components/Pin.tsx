import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Pin(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/pin.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(0, 0, 0);
    }
  }, [props.position]);

  return (
    <group
      ref={groupRef}
      {...props}
    >
      <primitive
        object={scene.clone()}
        scale={1}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
