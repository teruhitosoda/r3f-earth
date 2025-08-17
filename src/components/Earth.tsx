import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Pin from "./Pin";
import type { Coord } from "../types/Location";

function latLonToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

export default function Earth({ location }: { location: Coord | null }) {
  const { scene } = useGLTF("/models/earth.glb");
  const rotatingGroupRef = useRef<THREE.Group>(null);
  const scale = 1;
  const tilt = -23.5 * (Math.PI / 180);

  useFrame((_, delta) => {
    if (rotatingGroupRef.current) {
      rotatingGroupRef.current.rotation.y += delta * 0.1;
    }
  });

  const pinPosition = location ? latLonToVector3(location.lat, location.lon, scale) : [0, 0, 0];

  return (
    <group rotation={[0, 0, tilt]}>
      <group ref={rotatingGroupRef}>
        <primitive
          object={scene.clone()}
          scale={scale}
        />
        {location && <Pin position={pinPosition} />}
      </group>
    </group>
  );
}
