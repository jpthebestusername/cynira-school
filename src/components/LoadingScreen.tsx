import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Anime-style school building SVG component
const AnimeSchool = ({ progress }: { progress: number }) => {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full max-w-4xl mx-auto"
      style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 212, 255, 0.3))' }}
    >
      {/* Sky gradient background */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#16213e" />
          <stop offset="100%" stopColor="#0f3460" />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d2d44" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#c44536" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#00ff87" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="url(#skyGradient)" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.circle
          key={i}
          cx={50 + (i * 25) % 700}
          cy={20 + (i * 17) % 150}
          r={Math.random() * 1.5 + 0.5}
          fill="#fff"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Moon */}
      <motion.circle
        cx="680"
        cy="80"
        r="40"
        fill="#f4f4f4"
        filter="url(#softGlow)"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <circle cx="695" cy="75" r="35" fill="url(#skyGradient)" />

      {/* Ground */}
      <rect x="0" y="400" width="800" height="100" fill="#0a0a12" />
      <ellipse cx="400" cy="400" rx="450" ry="30" fill="#1a1a2e" />

      {/* Trees - Left */}
      <g>
        <rect x="60" y="320" width="15" height="80" fill="#3d2914" rx="2" />
        <motion.ellipse
          cx="67"
          cy="300"
          rx="40"
          ry="50"
          fill="#1a4d2e"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <ellipse cx="67" cy="290" rx="30" ry="35" fill="#2d6a4f" />
      </g>

      {/* Trees - Right */}
      <g>
        <rect x="720" y="330" width="12" height="70" fill="#3d2914" rx="2" />
        <motion.ellipse
          cx="726"
          cy="310"
          rx="35"
          ry="45"
          fill="#1a4d2e"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
        <ellipse cx="726" cy="302" rx="25" ry="30" fill="#2d6a4f" />
      </g>

      {/* Main Building */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Building base */}
        <rect x="200" y="200" width="400" height="200" fill="url(#buildingGradient)" stroke="#00d4ff" strokeWidth="2" />
        
        {/* Building details - horizontal lines */}
        <line x1="200" y1="250" x2="600" y2="250" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="200" y1="300" x2="600" y2="300" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="200" y1="350" x2="600" y2="350" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />

        {/* Main Roof */}
        <polygon points="180,200 400,100 620,200" fill="url(#roofGradient)" stroke="#ff6b35" strokeWidth="2" />
        
        {/* Roof details */}
        <line x1="400" y1="100" x2="400" y2="200" stroke="#c44536" strokeWidth="2" opacity="0.5" />
        
        {/* Clock tower */}
        <rect x="360" y="60" width="80" height="60" fill="url(#buildingGradient)" stroke="#00d4ff" strokeWidth="2" />
        <polygon points="350,60 400,20 450,60" fill="url(#roofGradient)" stroke="#ff6b35" strokeWidth="2" />
        
        {/* Clock */}
        <circle cx="400" cy="85" r="20" fill="#1a1a2e" stroke="#00d4ff" strokeWidth="2" />
        <circle cx="400" cy="85" r="15" fill="#0a0a12" />
        <motion.line
          x1="400"
          y1="85"
          x2="400"
          y2="75"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 85px' }}
        />
        <motion.line
          x1="400"
          y1="85"
          x2="408"
          y2="85"
          stroke="#00ff87"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 85px' }}
        />

        {/* Windows - Row 1 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={`window1-${i}`}>
            <rect
              x={225 + i * 75}
              y="220"
              width="30"
              height="40"
              fill={progress > (i + 1) * 15 ? "url(#windowGlow)" : "#0a0a12"}
              stroke="#00d4ff"
              strokeWidth="1"
              filter={progress > (i + 1) * 15 ? "url(#glow)" : "none"}
            />
            <line x1={240 + i * 75} y1="220" x2={240 + i * 75} y2="260" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />
            <line x1={225 + i * 75} y1="240" x2={255 + i * 75} y2="240" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />
          </motion.g>
        ))}

        {/* Windows - Row 2 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={`window2-${i}`}>
            <rect
              x={225 + i * 75}
              y="280"
              width="30"
              height="40"
              fill={progress > (i + 6) * 10 ? "url(#windowGlow)" : "#0a0a12"}
              stroke="#00d4ff"
              strokeWidth="1"
              filter={progress > (i + 6) * 10 ? "url(#glow)" : "none"}
            />
            <line x1={240 + i * 75} y1="280" x2={240 + i * 75} y2="320" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />
            <line x1={225 + i * 75} y1="300" x2={255 + i * 75} y2="300" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />
          </motion.g>
        ))}

        {/* Main Door */}
        <rect x="370" y="330" width="60" height="70" fill="#1a1a2e" stroke="#00d4ff" strokeWidth="2" />
        <rect x="375" y="335" width="22" height="60" fill="#0a0a12" stroke="#00d4ff" strokeWidth="1" />
        <rect x="403" y="335" width="22" height="60" fill="#0a0a12" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="395" cy="370" r="3" fill="#00ff87" filter="url(#glow)" />
        <circle cx="405" cy="370" r="3" fill="#00ff87" filter="url(#glow)" />
        
        {/* Door arch */}
        <path d="M370,330 Q400,310 430,330" fill="none" stroke="#ff6b35" strokeWidth="3" />

        {/* Steps */}
        <rect x="350" y="400" width="100" height="8" fill="#2d2d44" stroke="#00d4ff" strokeWidth="1" />
        <rect x="340" y="408" width="120" height="8" fill="#1a1a2e" stroke="#00d4ff" strokeWidth="1" />

        {/* Columns */}
        <rect x="220" y="200" width="20" height="200" fill="#2d2d44" stroke="#00d4ff" strokeWidth="1" />
        <rect x="560" y="200" width="20" height="200" fill="#2d2d44" stroke="#00d4ff" strokeWidth="1" />

        {/* Flag pole */}
        <line x1="400" y1="20" x2="400" y2="-20" stroke="#888" strokeWidth="3" />
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '400px -20px' }}
        >
          <polygon points="400,-20 440,-10 400,0" fill="#00d4ff" />
          <polygon points="400,-20 440,-10 400,0" fill="url(#windowGlow)" opacity="0.5" />
        </motion.g>
      </motion.g>

      {/* Left Wing */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="100" y="280" width="100" height="120" fill="url(#buildingGradient)" stroke="#00d4ff" strokeWidth="2" />
        <polygon points="90,280 150,230 210,280" fill="url(#roofGradient)" stroke="#ff6b35" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <motion.rect
            key={`left-window-${i}`}
            x={115 + i * 45}
            y="300"
            width="25"
            height="35"
            fill={progress > 70 + i * 10 ? "url(#windowGlow)" : "#0a0a12"}
            stroke="#00d4ff"
            strokeWidth="1"
            filter={progress > 70 + i * 10 ? "url(#glow)" : "none"}
          />
        ))}
        
        <rect x="135" y="360" width="30" height="40" fill="#0a0a12" stroke="#00d4ff" strokeWidth="1" />
      </motion.g>

      {/* Right Wing */}
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="600" y="280" width="100" height="120" fill="url(#buildingGradient)" stroke="#00d4ff" strokeWidth="2" />
        <polygon points="590,280 650,230 710,280" fill="url(#roofGradient)" stroke="#ff6b35" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <motion.rect
            key={`right-window-${i}`}
            x={615 + i * 45}
            y="300"
            width="25"
            height="35"
            fill={progress > 80 + i * 10 ? "url(#windowGlow)" : "#0a0a12"}
            stroke="#00d4ff"
            strokeWidth="1"
            filter={progress > 80 + i * 10 ? "url(#glow)" : "none"}
          />
        ))}
        
        <rect x="635" y="360" width="30" height="40" fill="#0a0a12" stroke="#00d4ff" strokeWidth="1" />
      </motion.g>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx={150 + i * 80}
          cy={380}
          r={2}
          fill="#00ff87"
          filter="url(#glow)"
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [-20, -80, -20], 
            opacity: [0, 1, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0]
          }}
          transition={{ 
            duration: 3 + i * 0.3, 
            repeat: Infinity, 
            delay: i * 0.4 
          }}
        />
      ))}

      {/* Sakura petals */}
      {[...Array(12)].map((_, i) => (
        <motion.ellipse
          key={`petal-${i}`}
          cx={100 + i * 60}
          cy={50 + (i % 3) * 30}
          rx={4}
          ry={2}
          fill="#ffb7c5"
          opacity={0.7}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ 
            x: [0, 100, 200], 
            y: [0, 150, 350],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8 + i * 0.5, 
            repeat: Infinity, 
            delay: i * 0.8,
            ease: "linear"
          }}
        />
      ))}

      {/* School name sign */}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="300" y="165" width="200" height="25" fill="#1a1a2e" stroke="#00d4ff" strokeWidth="1" rx="3" />
        <text x="400" y="183" textAnchor="middle" fill="#00d4ff" fontSize="14" fontFamily="monospace" fontWeight="bold">
          CYNIRA SCHOOL
        </text>
      </motion.g>
    </svg>
  );
};

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
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleZoomComplete = () => {
    setIsVisible(false);
    setTimeout(() => onLoadingComplete(), 300);
  };

  useEffect(() => {
    if (isZooming) {
      setTimeout(handleZoomComplete, 1200);
    }
  }, [isZooming]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a12] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Anime-style school illustration */}
          <motion.div
            className="w-full max-w-5xl px-4"
            animate={isZooming ? {
              scale: 3,
              y: 200,
              opacity: 0
            } : {
              scale: 1,
              y: 0,
              opacity: 1
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <AnimeSchool progress={progress} />
          </motion.div>

          {/* Loading UI */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6 px-8"
            animate={isZooming ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="relative h-2 bg-[#1a1a2e] rounded-full overflow-hidden border border-[#00d4ff]/30">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff, #00ff87, #ff6b35)',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-80, 400] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            {/* Loading text */}
            <div className="flex items-center gap-3">
              <motion.span
                className="text-[#00d4ff] font-mono text-lg"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ローディング
              </motion.span>
              <span className="text-white/60 font-mono text-lg">/</span>
              <span className="text-[#00ff87] font-mono text-xl font-bold">{progress}%</span>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#ff6b35]"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Corner decorations - anime style */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#ff6b35] opacity-60" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#00d4ff] opacity-60" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#00ff87] opacity-60" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#ff6b35] opacity-60" />

          {/* Scan lines effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
