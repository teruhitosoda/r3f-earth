import { Search } from "lucide-react";
import { Suspense, useState } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import Earth from "./Earth";
import type { Coord } from "../types/Location";
import { fetchLocation } from "../api/location";

export default function World() {
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<Coord | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return;
    setError("");
    setLocation(null);
    try {
      const data = await fetchLocation(city);
      setLocation({ lat: data.coord.lat, lon: data.coord.lon });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Failed to fetch weather data:", error);
      } else {
        setError("An unknown error occurred.");
        console.error("An unknown error occurred.");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <ambientLight
        intensity={1}
        color={"#ffffff"}
      />
      <directionalLight
        position={[1, 1, 1]}
        intensity={1}
        color={"#ffffff"}
      />
      <OrbitControls />
      <color
        args={["#f0fdfa"]}
        attach="background"
      />
      <Html
        position={[0, -1.8, 0]}
        center
        transform
        scale={0.5}
      >
        <div className="ml-3 flex flex-col items-start justify-start gap-y-2">
          <div className="flex gap-x-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="City, Country Code (e.g., Tokyo, JP)"
              className="w-60 flex-grow text-xs px-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 cursor-pointer"
            >
              <Search size={16} />
            </button>
          </div>
          {error && <p className="pl-2 text-red-500 text-xs">{error}</p>}
        </div>
      </Html>
      <Suspense fallback={<Html center>Loading...</Html>}>
        <Earth location={location} />
      </Suspense>
    </>
  );
}
