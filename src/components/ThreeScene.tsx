import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ==================== SHARED COMPONENTS ====================

// AI Core - Central pulsing sphere
function AICore({ position = [0, 0, 0] as [number, number, number], scale = 1, color = "#B5D32B" }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1;
      coreRef.current.scale.setScalar(scale * pulse);
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += 0.01;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <group ref={ringsRef}>
        {[0.8, 1.1, 1.4].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 64]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              transparent
              opacity={0.6 - i * 0.15}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Wide Neural Network - Spreads across full viewport
function WideNeuralNetwork({ spread = 20 }: { spread?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 25;
  
  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      positions.push([
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 4
      ]);
    }
    return positions;
  }, [spread]);

  const connections = useMemo(() => {
    const lines: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        if (dist < 8 && Math.random() > 0.4) {
          lines.push([i, j]);
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#B5D32B" 
            emissive="#B5D32B" 
            emissiveIntensity={1.5} 
          />
        </mesh>
      ))}
      {connections.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
        const length = start.distanceTo(end);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );
        
        return (
          <mesh key={`conn-${i}`} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.025, 0.025, length, 8]} />
            <meshStandardMaterial 
              color="#B5D32B" 
              emissive="#B5D32B"
              emissiveIntensity={0.8}
              transparent 
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Data Stream - Rising particles
function DataStream({ count = 150, spread = 25 }: { count?: number; spread?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      vel[i] = Math.random() * 0.03 + 0.015;
    }
    return [pos, vel];
  }, [count, spread]);

  useFrame(() => {
    if (meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += velocities[i];
        if (posArray[i * 3 + 1] > 8) {
          posArray[i * 3 + 1] = -8;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#B5D32B"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Circuit Board Pattern - Horizontal lines grid
function CircuitBoard({ width = 30, height = 20 }: { width?: number; height?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const paths = useMemo(() => {
    const lines: { points: THREE.Vector3[] }[] = [];
    const gridSize = 2;
    
    // Horizontal paths
    for (let y = -height/2; y <= height/2; y += gridSize) {
      const points: THREE.Vector3[] = [];
      let x = -width/2;
      while (x < width/2) {
        points.push(new THREE.Vector3(x, y, -8));
        const segmentLength = Math.random() * 4 + 2;
        x += segmentLength;
        if (Math.random() > 0.7) {
          const turnDir = Math.random() > 0.5 ? 1 : -1;
          points.push(new THREE.Vector3(x, y + turnDir * gridSize, -8));
          y += turnDir * gridSize;
        }
      }
      if (points.length > 1) lines.push({ points });
    }
    return lines;
  }, [width, height]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial;
          mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i * 0.3) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {paths.map((path, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(path.points);
        return (
          <primitive 
            key={i} 
            object={new THREE.Line(
              geometry, 
              new THREE.LineBasicMaterial({ 
                color: '#B5D32B', 
                transparent: true, 
                opacity: 0.4 
              })
            )} 
          />
        );
      })}
    </group>
  );
}

// Binary Rain - Falling data particles
function BinaryRain({ count = 100, spread = 30 }: { count?: number; spread?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = Math.random() * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      spd[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, spd];
  }, [count, spread]);

  useFrame(() => {
    if (meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] -= speeds[i];
        if (posArray[i * 3 + 1] < -8) {
          posArray[i * 3 + 1] = 10;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#B5D32B"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating Automation Gears
function AutomationGears() {
  const group1Ref = useRef<THREE.Mesh>(null);
  const group2Ref = useRef<THREE.Mesh>(null);
  const group3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group1Ref.current) group1Ref.current.rotation.z += 0.008;
    if (group2Ref.current) group2Ref.current.rotation.z -= 0.006;
    if (group3Ref.current) group3Ref.current.rotation.z += 0.01;
  });

  const GearShape = ({ radius, teeth }: { radius: number; teeth: number }) => {
    const shape = useMemo(() => {
      const s = new THREE.Shape();
      const innerRadius = radius * 0.7;
      const toothHeight = radius * 0.2;
      
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const nextAngle = ((i + 0.5) / teeth) * Math.PI * 2;
        const afterAngle = ((i + 1) / teeth) * Math.PI * 2;
        
        if (i === 0) {
          s.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        s.lineTo(Math.cos(nextAngle) * (radius + toothHeight), Math.sin(nextAngle) * (radius + toothHeight));
        s.lineTo(Math.cos(afterAngle) * radius, Math.sin(afterAngle) * radius);
      }
      s.closePath();
      
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      s.holes.push(hole);
      
      return s;
    }, [radius, teeth]);

    return <shapeGeometry args={[shape]} />;
  };

  return (
    <group>
      <mesh ref={group1Ref} position={[-8, 3, -6]}>
        <GearShape radius={1.5} teeth={12} />
        <meshStandardMaterial 
          color="#1a2a1a" 
          emissive="#B5D32B" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={group2Ref} position={[9, -2, -7]}>
        <GearShape radius={2} teeth={16} />
        <meshStandardMaterial 
          color="#1a2a1a" 
          emissive="#B5D32B" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={group3Ref} position={[-6, -4, -5]}>
        <GearShape radius={1.2} teeth={10} />
        <meshStandardMaterial 
          color="#1a2a1a" 
          emissive="#B5D32B" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Hexagonal Tech Grid
function HexTechGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const y = Math.sin(state.clock.elapsedTime * 2 + i * 0.2) * 0.1;
          child.position.y = -5 + y;
          (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 
            0.2 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.2;
        }
      });
    }
  });

  const hexagons = useMemo(() => {
    const positions: [number, number, number][] = [];
    const spacing = 2;
    for (let row = -5; row <= 5; row++) {
      for (let col = -8; col <= 8; col++) {
        const x = col * spacing * 0.866;
        const z = row * spacing + (col % 2 === 0 ? 0 : spacing / 2);
        if (Math.random() > 0.4) {
          positions.push([x, -5, z - 5]);
        }
      }
    }
    return positions;
  }, []);

  return (
    <group ref={gridRef}>
      {hexagons.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.6, 6]} />
          <meshStandardMaterial
            color="#0a1a0a"
            emissive="#B5D32B"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Tech Shapes
function FloatingTechShape({ 
  position, 
  geometry, 
  scale = 1,
  speed = 1 
}: {
  position: [number, number, number];
  geometry: 'cube' | 'octahedron' | 'tetrahedron' | 'icosahedron';
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'cube': return <boxGeometry args={[1, 1, 1]} />;
      case 'octahedron': return <octahedronGeometry args={[1]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[1]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color="#B5D32B"
          roughness={0.2}
          metalness={0.9}
          distort={0.1}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

// Code Brackets - Floating </>
function CodeBrackets() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[6, 2, -4]}>
      {/* Left bracket < */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.8} />
      </mesh>
      {/* Slash / */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.08, 2, 0.08]} />
        <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.6} />
      </mesh>
      {/* Right bracket > */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Workflow Arrows - Connected flowing arrows
function WorkflowArrows() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.x = -10 + ((state.clock.elapsedTime * 2 + i * 3) % 20);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-10 + i * 4, 0, -6]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.8, 3]} />
          <meshStandardMaterial 
            color="#B5D32B" 
            emissive="#B5D32B" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Document Stack - For SharePoint pages
function DocumentStack() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-7, 1, -5]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.15, i * 0.3, i * -0.15]} rotation={[0, 0.1 * i, 0]}>
          <boxGeometry args={[1.5, 2, 0.05]} />
          <meshStandardMaterial 
            color={i === 2 ? "#B5D32B" : "#1a2a1a"}
            emissive="#B5D32B"
            emissiveIntensity={i === 2 ? 0.5 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Chart Bars - For analytics/marketing pages
function ChartBars() {
  const groupRef = useRef<THREE.Group>(null);
  const heights = [1.5, 2.5, 1.8, 3, 2.2];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.1;
          child.scale.y = scale;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[-8, -2, -6]}>
      {heights.map((h, i) => (
        <mesh key={i} position={[i * 0.8, h / 2 - 1, 0]}>
          <boxGeometry args={[0.5, h, 0.5]} />
          <meshStandardMaterial 
            color="#B5D32B"
            emissive="#B5D32B"
            emissiveIntensity={0.5 + i * 0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Globe with connection points - For web/global services
function GlobalNetwork() {
  const globeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
    }
  });

  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 15; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.55;
      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ]);
    }
    return pts;
  }, []);

  return (
    <group position={[7, 1, -5]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#0a1a0a"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <group ref={pointsRef}>
        {points.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial 
              color="#B5D32B"
              emissive="#B5D32B"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ==================== PAGE-SPECIFIC SCENES ====================

interface ThreeSceneProps {
  variant?: 'hero' | 'about' | 'contact' | 'blogs' | 'sharepoint' | 'webdev' | 'marketing' | 'apps';
}

export function ThreeScene({ variant = 'hero' }: ThreeSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0f0a', 15, 50]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#B5D32B" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#B5D32B" distance={30} />
        <pointLight position={[-8, -3, 3]} intensity={0.5} color="#B5D32B" distance={25} />
        <pointLight position={[8, 3, -3]} intensity={0.5} color="#B5D32B" distance={25} />
        
        {/* HERO - Full spread AI/Automation theme */}
        {variant === 'hero' && (
          <>
            <WideNeuralNetwork spread={35} />
            <DataStream count={200} spread={40} />
            <CircuitBoard width={40} height={25} />
            <HexTechGrid />
            <AutomationGears />
            <AICore position={[0, 0, -3]} scale={1.5} />
            <AICore position={[-12, 4, -6]} scale={0.8} />
            <AICore position={[12, -3, -5]} scale={0.7} />
            <FloatingTechShape position={[-10, 2, -4]} geometry="octahedron" scale={1.2} speed={0.8} />
            <FloatingTechShape position={[10, 3, -5]} geometry="icosahedron" scale={1} speed={0.6} />
            <FloatingTechShape position={[-8, -3, -6]} geometry="tetrahedron" scale={0.9} speed={1} />
            <FloatingTechShape position={[9, -2, -4]} geometry="cube" scale={0.8} speed={0.7} />
          </>
        )}
        
        {/* ABOUT - Partnership/Connection theme */}
        {variant === 'about' && (
          <>
            <WideNeuralNetwork spread={30} />
            <DataStream count={100} spread={30} />
            <AICore position={[-5, 2, -3]} scale={1.2} />
            <AICore position={[5, 2, -3]} scale={1.2} />
            {/* Connection between cores */}
            <mesh position={[0, 2, -3]}>
              <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
              <meshStandardMaterial color="#B5D32B" emissive="#B5D32B" emissiveIntensity={0.8} />
            </mesh>
            <FloatingTechShape position={[-8, -2, -5]} geometry="icosahedron" scale={1.3} speed={0.5} />
            <FloatingTechShape position={[8, -2, -5]} geometry="octahedron" scale={1.1} speed={0.6} />
            <HexTechGrid />
          </>
        )}
        
        {/* CONTACT - Communication theme */}
        {variant === 'contact' && (
          <>
            <DataStream count={80} spread={25} />
            <WideNeuralNetwork spread={25} />
            <AICore position={[0, 1, -2]} scale={1.8} color="#B5D32B" />
            <WorkflowArrows />
            <FloatingTechShape position={[-7, 2, -5]} geometry="tetrahedron" scale={1} speed={0.7} />
            <FloatingTechShape position={[7, -1, -4]} geometry="cube" scale={0.9} speed={0.8} />
          </>
        )}
        
        {/* BLOGS - Knowledge/Information theme */}
        {variant === 'blogs' && (
          <>
            <BinaryRain count={150} spread={35} />
            <DataStream count={100} spread={30} />
            <CodeBrackets />
            <DocumentStack />
            <WideNeuralNetwork spread={28} />
            <FloatingTechShape position={[-9, 3, -6]} geometry="octahedron" scale={1.1} speed={0.5} />
            <FloatingTechShape position={[8, -3, -5]} geometry="icosahedron" scale={0.9} speed={0.7} />
          </>
        )}
        
        {/* SHAREPOINT - Document/Workflow theme */}
        {variant === 'sharepoint' && (
          <>
            <DocumentStack />
            <WorkflowArrows />
            <WideNeuralNetwork spread={25} />
            <DataStream count={80} spread={25} />
            <HexTechGrid />
            <AICore position={[0, 0, -3]} scale={1.2} />
            <FloatingTechShape position={[8, 2, -5]} geometry="cube" scale={1.2} speed={0.6} />
          </>
        )}
        
        {/* WEBDEV - Code/Development theme */}
        {variant === 'webdev' && (
          <>
            <CodeBrackets />
            <BinaryRain count={120} spread={30} />
            <CircuitBoard width={35} height={20} />
            <WideNeuralNetwork spread={28} />
            <GlobalNetwork />
            <FloatingTechShape position={[-9, -2, -5]} geometry="tetrahedron" scale={1} speed={0.8} />
            <FloatingTechShape position={[-7, 3, -6]} geometry="octahedron" scale={0.9} speed={0.6} />
          </>
        )}
        
        {/* MARKETING - Analytics/Growth theme */}
        {variant === 'marketing' && (
          <>
            <ChartBars />
            <GlobalNetwork />
            <DataStream count={100} spread={30} />
            <WideNeuralNetwork spread={25} />
            <WorkflowArrows />
            <FloatingTechShape position={[-6, 4, -5]} geometry="icosahedron" scale={1} speed={0.5} />
            <FloatingTechShape position={[6, -3, -6]} geometry="cube" scale={0.8} speed={0.7} />
          </>
        )}
        
        {/* APPS - Application/Integration theme */}
        {variant === 'apps' && (
          <>
            <AutomationGears />
            <CircuitBoard width={30} height={20} />
            <WideNeuralNetwork spread={28} />
            <DataStream count={120} spread={28} />
            <AICore position={[0, 1, -3]} scale={1.3} />
            <CodeBrackets />
            <FloatingTechShape position={[-10, -2, -5]} geometry="octahedron" scale={1.1} speed={0.6} />
            <FloatingTechShape position={[10, 2, -6]} geometry="icosahedron" scale={1} speed={0.5} />
          </>
        )}
      </Canvas>
    </div>
  );
}

// Scroll-triggered 3D element for content sections
export function ScrollThreeElement({ type = 'node' }: { type?: 'node' | 'gear' | 'cube' | 'network' }) {
  return (
    <div className="w-full h-64 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#B5D32B" />
        
        {type === 'node' && <AICore position={[0, 0, 0]} scale={1.5} />}
        {type === 'gear' && <AutomationGears />}
        {type === 'cube' && <FloatingTechShape position={[0, 0, 0]} geometry="cube" scale={2} speed={0.5} />}
        {type === 'network' && <WideNeuralNetwork spread={8} />}
      </Canvas>
    </div>
  );
}
