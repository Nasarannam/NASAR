import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';

function Orb() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.2;
    ref.current.rotation.x += delta * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#7b8cff" wireframe emissive="#63f5ff" emissiveIntensity={0.6} />
    </mesh>
  );
}

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight intensity={2} position={[4, 4, 4]} color="#63f5ff" />
        <Orb />
        <Stars radius={100} depth={30} count={3000} factor={4} fade speed={0.8} />
      </Canvas>
    </div>
  );
}
