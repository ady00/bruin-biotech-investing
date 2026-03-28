'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function DNAStrand() {
  const groupRef = useRef<THREE.Group>(null);

  // DNA parameters - taller for full-height display
  const numBasePairs = 35;
  const helixRadius = 1;
  const helixPitch = 0.28;

  // Generate DNA geometry
  const { strand1Points, strand2Points, basePairs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const bp: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];

    for (let i = 0; i < numBasePairs; i++) {
      const angle = (i / numBasePairs) * Math.PI * 5; // 2.5 full turns
      const y = (i - numBasePairs / 2) * helixPitch;

      // Strand 1
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      s1.push(new THREE.Vector3(x1, y, z1));

      // Strand 2 (opposite side, offset by PI)
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      s2.push(new THREE.Vector3(x2, y, z2));

      // Base pair connection
      if (i % 2 === 0) {
        bp.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
          color: i % 4 === 0 ? '#FB7185' : '#FDBA74',
        });
      }
    }

    return { strand1Points: s1, strand2Points: s2, basePairs: bp };
  }, []);

  // Create smooth curves for strands
  const strand1Curve = useMemo(
    () => new THREE.CatmullRomCurve3(strand1Points),
    [strand1Points]
  );
  const strand2Curve = useMemo(
    () => new THREE.CatmullRomCurve3(strand2Points),
    [strand2Points]
  );

  // Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 - Rose/Red */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 100, 0.07, 8, false]} />
        <meshStandardMaterial
          color="#E11D48"
          emissive="#E11D48"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Strand 2 - Orange */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 100, 0.07, 8, false]} />
        <meshStandardMaterial
          color="#F97316"
          emissive="#F97316"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Base pair connections */}
      {basePairs.map((bp, i) => {
        const direction = new THREE.Vector3().subVectors(bp.end, bp.start);
        const length = direction.length();
        const midpoint = new THREE.Vector3()
          .addVectors(bp.start, bp.end)
          .multiplyScalar(0.5);

        return (
          <mesh
            key={`bp-${i}`}
            position={midpoint}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.clone().normalize()
            )}
          >
            <cylinderGeometry args={[0.025, 0.025, length, 8]} />
            <meshStandardMaterial
              color={bp.color}
              emissive={bp.color}
              emissiveIntensity={0.3}
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#E11D48" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F97316" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
      />

      {/* DNA Helix */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
        <DNAStrand />
      </Float>
    </>
  );
}

export function DNAHelix() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
