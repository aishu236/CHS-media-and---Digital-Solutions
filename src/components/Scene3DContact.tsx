import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function SpinningRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={ref} position={[3, 0, -2]} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#d4940a"
          roughness={0.3}
          metalness={0.8}
          distort={0.1}
          speed={3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function WobblySphere() {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={[-3, -1, -3]} scale={1}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshWobbleMaterial
          color="#3b9dd6"
          factor={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.4}
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
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#d4940a" />
          <pointLight position={[-5, -3, 3]} intensity={0.4} color="#3b9dd6" />
          <SpinningRing />
          <WobblySphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
