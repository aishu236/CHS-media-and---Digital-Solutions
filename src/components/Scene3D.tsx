import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#d4940a"
          roughness={0.2}
          metalness={0.9}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, -1, -2]} scale={0.8}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#3b9dd6"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={2}>
      <mesh position={[-3, 1.5, -3]} scale={0.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#d4940a"
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#d4940a" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#3b9dd6" />
          <FloatingOctahedron />
          <FloatingTorus />
          <FloatingSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
