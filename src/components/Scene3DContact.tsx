import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function SoftBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref} position={[3, 0, -2]} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#e8a030"
          roughness={0.7}
          metalness={0.05}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
}

function SoftCircle() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh position={[-3, -1, -3]} scale={1.2}>
        <torusGeometry args={[1, 0.3, 32, 64]} />
        <meshStandardMaterial
          color="#d4d4d4"
          roughness={0.8}
          metalness={0.05}
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3DContact() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
          <SoftBlob />
          <SoftCircle />
        </Suspense>
      </Canvas>
    </div>
  );
}
