import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Realistic School Building Component
function SchoolBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  // Brick texture simulation through color variation
  const brickMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.9,
    metalness: 0.1,
  }), []);

  const darkBrickMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#654321',
    roughness: 0.85,
    metalness: 0.1,
  }), []);

  const concreteMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D3D3D3',
    roughness: 0.7,
    metalness: 0.05,
  }), []);

  const roofMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2F4F4F',
    roughness: 0.6,
    metalness: 0.3,
  }), []);

  const windowGlassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#87CEEB',
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.7,
    reflectivity: 1,
  }), []);

  const windowFrameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFFFFF',
    roughness: 0.3,
    metalness: 0.1,
  }), []);

  const doorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B0000',
    roughness: 0.5,
    metalness: 0.2,
  }), []);

  const grassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#228B22',
    roughness: 0.95,
    metalness: 0,
  }), []);

  const pathMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#696969',
    roughness: 0.8,
    metalness: 0.1,
  }), []);

  // Window component for reuse
  const Window = ({ position, scale = [1, 1, 1] }: { position: [number, number, number], scale?: [number, number, number] }) => (
    <group position={position} scale={scale}>
      {/* Window frame */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.55, 0.75, 0.08]} />
        <primitive object={windowFrameMaterial} attach="material" />
      </mesh>
      {/* Window glass */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.45, 0.65, 0.02]} />
        <primitive object={windowGlassMaterial} attach="material" />
      </mesh>
      {/* Window dividers */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.45, 0.03, 0.01]} />
        <primitive object={windowFrameMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.03, 0.65, 0.01]} />
        <primitive object={windowFrameMaterial} attach="material" />
      </mesh>
      {/* Window sill */}
      <mesh position={[0, -0.4, 0.1]}>
        <boxGeometry args={[0.6, 0.05, 0.15]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
    </group>
  );

  // Column component
  const Column = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
      {/* Column base */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.35]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
      {/* Column shaft */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 2.4, 16]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
      {/* Column capital */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
    </group>
  );

  // Tree component
  const Tree = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.5, 0.8, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.4, 0.7, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <coneGeometry args={[0.3, 0.5, 8]} />
        <meshStandardMaterial color="#43A047" roughness={0.8} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* ========== MAIN BUILDING ========== */}
      {/* Foundation */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[8, 0.2, 4]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Main Building Body - First Floor */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.5, 2.2, 3.5]} />
        <primitive object={brickMaterial} attach="material" />
      </mesh>

      {/* Main Building Body - Second Floor */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.5, 1.8, 3.5]} />
        <primitive object={darkBrickMaterial} attach="material" />
      </mesh>

      {/* Decorative band between floors */}
      <mesh position={[0, 2.35, 0]}>
        <boxGeometry args={[7.7, 0.15, 3.7]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Top cornice */}
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[7.8, 0.2, 3.8]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 4.7, 0]}>
        <boxGeometry args={[8, 0.8, 4]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>

      {/* Roof ridge */}
      <mesh position={[0, 5.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.3, 4.2]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>

      {/* ========== ENTRANCE PORTICO ========== */}
      {/* Portico roof */}
      <mesh position={[0, 3.5, 2.3]}>
        <boxGeometry args={[3, 0.25, 1.2]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Portico pediment (triangular) */}
      <mesh position={[0, 4, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0, 1.5, 0.8, 3]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Columns */}
      <Column position={[-1.1, 0, 2]} />
      <Column position={[1.1, 0, 2]} />

      {/* ========== MAIN ENTRANCE ========== */}
      {/* Door frame */}
      <mesh position={[0, 1.1, 1.78]}>
        <boxGeometry args={[1.4, 2, 0.15]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>

      {/* Double doors */}
      <mesh position={[-0.35, 1, 1.85]}>
        <boxGeometry args={[0.55, 1.7, 0.08]} />
        <primitive object={doorMaterial} attach="material" />
      </mesh>
      <mesh position={[0.35, 1, 1.85]}>
        <boxGeometry args={[0.55, 1.7, 0.08]} />
        <primitive object={doorMaterial} attach="material" />
      </mesh>

      {/* Door handles */}
      <mesh position={[-0.15, 1, 1.92]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 1, 1.92]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Transom window above door */}
      <mesh position={[0, 2.1, 1.85]}>
        <boxGeometry args={[1.2, 0.35, 0.05]} />
        <primitive object={windowGlassMaterial} attach="material" />
      </mesh>

      {/* ========== FIRST FLOOR WINDOWS ========== */}
      {/* Left side */}
      <Window position={[-2.5, 1.2, 1.78]} />
      <Window position={[-1.5, 1.2, 1.78]} />
      {/* Right side */}
      <Window position={[1.5, 1.2, 1.78]} />
      <Window position={[2.5, 1.2, 1.78]} />

      {/* ========== SECOND FLOOR WINDOWS ========== */}
      {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
        <Window key={`floor2-${i}`} position={[x, 3.2, 1.78]} scale={[0.9, 0.9, 1]} />
      ))}

      {/* ========== LEFT WING ========== */}
      <mesh position={[-4.5, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 3]} />
        <primitive object={brickMaterial} attach="material" />
      </mesh>
      <mesh position={[-4.5, 2.6, 0]}>
        <boxGeometry args={[2, 1.2, 3]} />
        <primitive object={darkBrickMaterial} attach="material" />
      </mesh>
      <mesh position={[-4.5, 3.35, 0]}>
        <boxGeometry args={[2.2, 0.15, 3.2]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
      {/* Left wing roof */}
      <mesh position={[-4.5, 3.8, 0]}>
        <boxGeometry args={[2.4, 0.6, 3.4]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>
      {/* Left wing windows */}
      <Window position={[-4.5, 1.2, 1.53]} scale={[0.8, 0.8, 1]} />
      <Window position={[-4.5, 2.6, 1.53]} scale={[0.7, 0.7, 1]} />

      {/* ========== RIGHT WING ========== */}
      <mesh position={[4.5, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 3]} />
        <primitive object={brickMaterial} attach="material" />
      </mesh>
      <mesh position={[4.5, 2.6, 0]}>
        <boxGeometry args={[2, 1.2, 3]} />
        <primitive object={darkBrickMaterial} attach="material" />
      </mesh>
      <mesh position={[4.5, 3.35, 0]}>
        <boxGeometry args={[2.2, 0.15, 3.2]} />
        <primitive object={concreteMaterial} attach="material" />
      </mesh>
      {/* Right wing roof */}
      <mesh position={[4.5, 3.8, 0]}>
        <boxGeometry args={[2.4, 0.6, 3.4]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>
      {/* Right wing windows */}
      <Window position={[4.5, 1.2, 1.53]} scale={[0.8, 0.8, 1]} />
      <Window position={[4.5, 2.6, 1.53]} scale={[0.7, 0.7, 1]} />

      {/* ========== CLOCK TOWER ========== */}
      <mesh position={[0, 5.6, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <primitive object={brickMaterial} attach="material" />
      </mesh>
      {/* Clock face */}
      <mesh position={[0, 5.6, 0.78]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#FFFEF0" />
      </mesh>
      {/* Clock hands */}
      <mesh position={[0, 5.6, 0.8]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.25, 0.03, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 5.6, 0.8]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Tower roof */}
      <mesh position={[0, 6.5, 0]}>
        <coneGeometry args={[0.9, 1, 4]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>
      {/* Spire */}
      <mesh position={[0, 7.2, 0]}>
        <coneGeometry args={[0.1, 0.5, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ========== FLAG ========== */}
      <mesh position={[0, 7.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.2, 8.1, 0]}>
        <boxGeometry args={[0.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.3} />
      </mesh>

      {/* ========== GROUND & LANDSCAPING ========== */}
      {/* Main grass area */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <primitive object={grassMaterial} attach="material" />
      </mesh>

      {/* Pathway */}
      <mesh position={[0, 0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 5]} />
        <primitive object={pathMaterial} attach="material" />
      </mesh>

      {/* Steps to entrance */}
      {[0, 0.15, 0.3].map((y, i) => (
        <mesh key={`step-${i}`} position={[0, y, 1.8 + i * 0.3]}>
          <boxGeometry args={[2.5 - i * 0.3, 0.15, 0.3]} />
          <primitive object={concreteMaterial} attach="material" />
        </mesh>
      ))}

      {/* Trees */}
      <Tree position={[-7, 0, 3]} />
      <Tree position={[7, 0, 3]} />
      <Tree position={[-6.5, 0, -2]} />
      <Tree position={[6.5, 0, -2]} />

      {/* Bushes */}
      {[-3, -5, 3, 5].map((x, i) => (
        <mesh key={`bush-${i}`} position={[x, 0.25, 3]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.9} />
        </mesh>
      ))}

      {/* Fence posts */}
      {[-8, -6, -4, 4, 6, 8].map((x, i) => (
        <group key={`fence-${i}`}>
          <mesh position={[x, 0.4, 6]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#5D4037" roughness={0.8} />
          </mesh>
          <mesh position={[x, 0.85, 6]}>
            <coneGeometry args={[0.08, 0.15, 4]} />
            <meshStandardMaterial color="#5D4037" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Fence rails */}
      <mesh position={[-6, 0.5, 6]}>
        <boxGeometry args={[4.2, 0.08, 0.05]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
      <mesh position={[6, 0.5, 6]}>
        <boxGeometry args={[4.2, 0.08, 0.05]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>

      {/* School sign */}
      <group position={[0, 0.8, 6.5]}>
        <mesh>
          <boxGeometry args={[2.5, 0.8, 0.15]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
        </mesh>
        {/* Sign glow */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.3, 0.6, 0.02]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Floating particles for atmosphere */}
      {Array.from({ length: 30 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  );
}

function FloatingParticle({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomOffset = useMemo(() => ({
    x: (Math.random() - 0.5) * 16,
    y: Math.random() * 8 + 1,
    z: (Math.random() - 0.5) * 12,
    speed: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    size: Math.random() * 0.04 + 0.02
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = randomOffset.y + Math.sin(state.clock.elapsedTime * randomOffset.speed + randomOffset.phase) * 0.5;
      meshRef.current.position.x = randomOffset.x + Math.cos(state.clock.elapsedTime * 0.2 + index) * 0.3;
    }
  });

  const colors = ['#00ff87', '#00d4ff', '#FFD700', '#ff6b35'];
  const color = colors[index % colors.length];

  return (
    <mesh ref={meshRef} position={[randomOffset.x, randomOffset.y, randomOffset.z]}>
      <sphereGeometry args={[randomOffset.size, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function CameraController({ isZooming, onZoomComplete }: { isZooming: boolean; onZoomComplete: () => void }) {
  const { camera } = useThree();
  const startPos = useRef({ x: 0, y: 4, z: 14 });
  const zoomProgress = useRef(0);
  
  useFrame((state, delta) => {
    if (isZooming) {
      zoomProgress.current += delta * 0.6;
      const t = Math.min(zoomProgress.current, 1);
      const easeT = 1 - Math.pow(1 - t, 4); // easeOutQuart for smoother zoom
      
      camera.position.x = THREE.MathUtils.lerp(startPos.current.x, 0, easeT);
      camera.position.y = THREE.MathUtils.lerp(startPos.current.y, 2, easeT);
      camera.position.z = THREE.MathUtils.lerp(startPos.current.z, 3, easeT);
      camera.lookAt(0, 1.5, 0);
      
      if (t >= 1) {
        onZoomComplete();
      }
    } else {
      // Gentle orbital movement before zoom
      const time = state.clock.elapsedTime;
      camera.position.x = startPos.current.x + Math.sin(time * 0.15) * 2;
      camera.position.y = startPos.current.y + Math.sin(time * 0.1) * 0.5;
      camera.position.z = startPos.current.z;
      camera.lookAt(0, 2, 0);
    }
  });

  return null;
}

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsZooming(true), 300);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleZoomComplete = () => {
    setIsVisible(false);
    setTimeout(onLoadingComplete, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#0a0a12] flex flex-col items-center justify-center"
        >
          {/* 3D Canvas */}
          <div className="w-full h-[65vh] sm:h-[70vh]">
            <Canvas
              shadows
              camera={{ position: [0, 4, 14], fov: 45 }}
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              {/* Sky gradient */}
              <color attach="background" args={['#1a1a2e']} />
              <fog attach="fog" args={['#1a1a2e', 12, 30]} />
              
              {/* Lighting setup */}
              <ambientLight intensity={0.4} />
              
              {/* Main sun light */}
              <directionalLight
                position={[10, 15, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
              />
              
              {/* Fill light */}
              <directionalLight
                position={[-5, 8, -5]}
                intensity={0.5}
                color="#87CEEB"
              />
              
              {/* Accent lights */}
              <pointLight position={[0, 3, 5]} intensity={0.8} color="#00ff87" distance={10} />
              <pointLight position={[-6, 4, 2]} intensity={0.4} color="#00d4ff" distance={8} />
              <pointLight position={[6, 4, 2]} intensity={0.4} color="#ff6b35" distance={8} />
              
              {/* Hemisphere light for natural sky reflection */}
              <hemisphereLight
                color="#87CEEB"
                groundColor="#228B22"
                intensity={0.3}
              />

              <SchoolBuilding />
              <CameraController isZooming={isZooming} onZoomComplete={handleZoomComplete} />
            </Canvas>
          </div>

          {/* Loading UI */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-w-md mx-auto space-y-4">
              {/* School name */}
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-center"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="text-white">CYNIRA</span>
                <span className="text-[#00ff87] ml-2">SCHOOL</span>
              </motion.h1>

              {/* Progress bar container */}
              <div className="relative">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #00ff87, #00d4ff, #00ff87)',
                      backgroundSize: '200% 100%',
                    }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(progress, 100)}%`,
                      backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{ 
                      width: { duration: 0.3 },
                      backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                    }}
                  />
                </div>
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-md opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, #00ff87, #00d4ff)',
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>

              {/* Loading text */}
              <div className="flex justify-between items-center text-sm">
                <motion.span 
                  className="text-white/60"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress < 100 ? 'Carregando experiência...' : 'Entrando...'}
                </motion.span>
                <span className="text-[#00ff87] font-mono font-bold">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#00ff87]/50" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#00ff87]/50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#00d4ff]/50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#00d4ff]/50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
