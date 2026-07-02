import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

export default function Product3DViewer() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#007bff" />
      </mesh>
    </Canvas>
  );
}