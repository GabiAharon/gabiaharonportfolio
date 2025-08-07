import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function TiltGroup({ children }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    mouse.current.x += (pointer.x * 0.25 - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y * 0.25 - mouse.current.y) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.current.y;
      groupRef.current.rotation.y = mouse.current.x;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function FloatingDust() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 60;
      arr[i3 + 1] = (Math.random() - 0.5) * 40;
      arr[i3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, [count]);

  const pointsRef = useRef();
  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a7b2ff" transparent opacity={0.4} />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <TiltGroup>
          <Stars radius={80} depth={50} count={2000} factor={2} fade speed={0.4} />
          <FloatingDust />
        </TiltGroup>
        <EffectComposer multisampling={4}>
          <Bloom intensity={0.35} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}


