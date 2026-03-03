import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function SoftSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#e8a030"
          roughness={0.6}
          metalness={0.1}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function SoftTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[3, -1.5, -3]} scale={0.8}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshStandardMaterial
          color="#d4d4d4"
          roughness={0.8}
          metalness={0.05}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function SoftRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-3, 1, -2]} scale={0.6}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#e8a030"
          roughness={0.7}
          metalness={0.05}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function MouseFollowLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (light.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      light.current.position.set(x, y, 3);
    }
  });

  return <pointLight ref={light} intensity={0.3} color="#e8a030" distance={8} />;
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
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
          <MouseFollowLight />
          <SoftSphere />
          <SoftTorus />
          <SoftRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
