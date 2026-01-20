import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// School Building Component
function SchoolBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main Building */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 2.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.4, 0.3, 2.4]} />
        <meshStandardMaterial color="#00ff87" metalness={0.5} roughness={0.3} emissive="#00ff87" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Windows Row 1 */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={`window-1-${i}`} position={[x, 1.3, 1.01]}>
          <boxGeometry args={[0.5, 0.4, 0.05]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Windows Row 2 */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={`window-2-${i}`} position={[x, 0.7, 1.01]}>
          <boxGeometry args={[0.5, 0.4, 0.05]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Door */}
      <mesh position={[0, 0.4, 1.01]}>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Left Wing */}
      <mesh position={[-2.8, 0.6, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-2.8, 1.35, 0]}>
        <boxGeometry args={[1.7, 0.2, 1.7]} />
        <meshStandardMaterial color="#00ff87" metalness={0.5} roughness={0.3} emissive="#00ff87" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Right Wing */}
      <mesh position={[2.8, 0.6, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[2.8, 1.35, 0]}>
        <boxGeometry args={[1.7, 0.2, 1.7]} />
        <meshStandardMaterial color="#00ff87" metalness={0.5} roughness={0.3} emissive="#00ff87" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Flag Pole */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Flag */}
      <mesh position={[0.2, 3.5, 0]}>
        <boxGeometry args={[0.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Ground */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.1} roughness={0.9} />
      </mesh>
      
      {/* Glowing particles around */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  );
}

// Floating particle effect
function FloatingParticle({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomX = (Math.random() - 0.5) * 10;
  const randomZ = (Math.random() - 0.5) * 6;
  const randomSpeed = 0.5 + Math.random() * 1;
  const randomOffset = Math.random() * Math.PI * 2;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * randomSpeed + randomOffset) * 2;
    }
  });

  const colors = ['#00ff87', '#00d4ff', '#ff6b35'];
  const color = colors[index % colors.length];

  return (
    <mesh ref={meshRef} position={[randomX, 1, randomZ]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

// Camera animation controller
function CameraController({ isZooming, onZoomComplete }: { isZooming: boolean; onZoomComplete: () => void }) {
  const { camera } = useThree();
  const startPos = useRef({ x: 0, y: 2, z: 8 });
  const zoomProgress = useRef(0);
  
  useFrame((_, delta) => {
    if (isZooming) {
      zoomProgress.current += delta * 0.8;
      const t = Math.min(zoomProgress.current, 1);
      const easeT = 1 - Math.pow(1 - t, 3); // easeOutCubic
      
      camera.position.x = THREE.MathUtils.lerp(startPos.current.x, 0, easeT);
      camera.position.y = THREE.MathUtils.lerp(startPos.current.y, 0.5, easeT);
      camera.position.z = THREE.MathUtils.lerp(startPos.current.z, 0.5, easeT);
      camera.lookAt(0, 0.5, 0);
      
      if (t >= 1) {
        onZoomComplete();
      }
    } else {
      camera.position.set(startPos.current.x, startPos.current.y, startPos.current.z);
      camera.lookAt(0, 0.5, 0);
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
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsZooming(true), 300);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleZoomComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
        >
          {/* 3D Canvas */}
          <div className="w-full h-[60vh] sm:h-[70vh]">
            <Canvas
              camera={{ position: [0, 2, 8], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#0a0a12']} />
              <fog attach="fog" args={['#0a0a12', 5, 20]} />
              
              {/* Lighting */}
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#00ff87" />
              <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00d4ff" />
              <pointLight position={[0, 3, 0]} intensity={0.8} color="#ff6b35" />
              
              <SchoolBuilding />
              <CameraController isZooming={isZooming} onZoomComplete={handleZoomComplete} />
            </Canvas>
          </div>

          {/* Loading UI */}
          <motion.div 
            className="absolute bottom-[15%] left-0 right-0 flex flex-col items-center gap-4 px-6"
            animate={{ opacity: isZooming ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* School Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-4xl font-display tracking-wider text-center"
            >
              <span className="text-gradient">ESCOLA CYNIRA</span>
            </motion.h1>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-sm"
            >
              {progress < 100 ? 'Carregando experiência...' : 'Entrando...'}
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary opacity-50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent opacity-50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent opacity-50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
