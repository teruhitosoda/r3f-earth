import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import World from "./components/World";
import "./App.css";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 10],
        }}
        shadows="soft"
      >
        <Perf position="top-left" />
        <World />
      </Canvas>
    </div>
  );
}

export default App;
