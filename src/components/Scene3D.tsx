import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
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
          distort={0.2}
          speed={3}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[3.5, -1, -2]} scale={0.6}>
        <torusKnotGeometry args={[1, 0.35, 128, 16, 2, 3]} />
        <MeshWobbleMaterial
          color="#3b9dd6"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.5}
          factor={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={2}>
      <mesh position={[-3.5, 1.5, -3]} scale={0.5}>
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

function FloatingDodecahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-2, -2, -1]} scale={0.7}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#d4940a"
          roughness={0.5}
          metalness={0.6}
          distort={0.08}
          speed={2}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  return (
    <Sparkles
      count={80}
      scale={12}
      size={1.5}
      speed={0.4}
      color="#d4940a"
      opacity={0.3}
    />
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

  return <pointLight ref={light} intensity={0.6} color="#d4940a" distance={8} />;
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
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#d4940a" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#3b9dd6" />
          <MouseFollowLight />
          <FloatingOctahedron />
          <FloatingTorusKnot />
          <FloatingIcosahedron />
          <FloatingDodecahedron />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
