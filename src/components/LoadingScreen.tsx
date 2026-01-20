import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// School building SVG - Professional warm sunset style
const AnimeSchool = ({ progress, doorOpen }: { progress: number; doorOpen: boolean }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full max-w-4xl mx-auto"
      style={{ filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.3))' }}
    >
      {/* Sky gradient - Golden hour / Early evening */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C3E50" />
          <stop offset="30%" stopColor="#4A5568" />
          <stop offset="60%" stopColor="#8B7355" />
          <stop offset="85%" stopColor="#C9A66B" />
          <stop offset="100%" stopColor="#D4A574" />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8DDD4" />
          <stop offset="50%" stopColor="#D4C4B0" />
          <stop offset="100%" stopColor="#C4B49C" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#723A11" />
          <stop offset="100%" stopColor="#5D2E0C" />
        </linearGradient>
        <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5C6B7A" />
          <stop offset="50%" stopColor="#4A5568" />
          <stop offset="100%" stopColor="#3D4852" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A5D4A" />
          <stop offset="100%" stopColor="#3D4D3D" />
        </linearGradient>
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4E37" />
          <stop offset="100%" stopColor="#3D3225" />
        </linearGradient>
        <linearGradient id="doorLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="50%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
        <radialGradient id="sunRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE4B5" />
          <stop offset="50%" stopColor="#DEB887" />
          <stop offset="100%" stopColor="#C9A66B" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background - Sunset sky */}
      <rect x="0" y="0" width="800" height="600" fill="url(#skyGradient)" />

      {/* Sun - Setting, warm glow */}
      <motion.g
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="680" cy="180" r="45" fill="url(#sunRadial)" filter="url(#softGlow)" opacity="0.9" />
      </motion.g>

      {/* Subtle clouds */}
      <motion.g opacity="0.4">
        <ellipse cx="150" cy="100" rx="70" ry="25" fill="#5A6B7A" />
        <ellipse cx="200" cy="90" rx="50" ry="20" fill="#5A6B7A" />
        <ellipse cx="110" cy="110" rx="40" ry="18" fill="#5A6B7A" />
      </motion.g>
      <motion.g opacity="0.3">
        <ellipse cx="550" cy="80" rx="55" ry="22" fill="#5A6B7A" />
        <ellipse cx="590" cy="70" rx="40" ry="18" fill="#5A6B7A" />
      </motion.g>

      {/* Ground - Muted grass */}
      <ellipse cx="400" cy="520" rx="500" ry="100" fill="url(#grassGradient)" />
      <ellipse cx="400" cy="550" rx="450" ry="60" fill="#354435" />

      {/* Trees - Left side (muted, realistic) */}
      <g>
        <rect x="50" y="380" width="18" height="100" fill="#4A3728" rx="2" />
        <motion.g
          animate={{ rotate: [0, 0.5, 0, -0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: '59px 380px' }}
        >
          <ellipse cx="59" cy="350" rx="50" ry="60" fill="#3D5A3D" />
          <ellipse cx="45" cy="335" rx="35" ry="40" fill="#4A6B4A" />
          <ellipse cx="75" cy="345" rx="30" ry="35" fill="#3D5A3D" />
        </motion.g>
      </g>

      {/* Trees - Right side */}
      <g>
        <rect x="720" y="390" width="16" height="90" fill="#4A3728" rx="2" />
        <motion.g
          animate={{ rotate: [0, -0.5, 0, 0.5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
          style={{ transformOrigin: '728px 390px' }}
        >
          <ellipse cx="728" cy="360" rx="45" ry="55" fill="#3D5A3D" />
          <ellipse cx="715" cy="345" rx="30" ry="35" fill="#4A6B4A" />
          <ellipse cx="745" cy="355" rx="25" ry="30" fill="#3D5A3D" />
        </motion.g>
      </g>

      {/* Shrubs - Subtle */}
      {[160, 260, 540, 640].map((x, idx) => (
        <g key={`shrub-${idx}`}>
          <ellipse cx={x} cy="490" rx="25" ry="12" fill="#3D5A3D" />
          <ellipse cx={x - 10} cy="488" rx="15" ry="10" fill="#4A6B4A" />
          <ellipse cx={x + 12} cy="489" rx="18" ry="11" fill="#354435" />
        </g>
      ))}

      {/* Main Building */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Building base */}
        <rect x="200" y="240" width="400" height="240" fill="url(#buildingGradient)" stroke="#8B7355" strokeWidth="2" rx="3" />
        
        {/* Building shadow/depth */}
        <rect x="200" y="240" width="400" height="240" fill="#000" opacity="0.05" />
        
        {/* Horizontal architectural lines */}
        <line x1="200" y1="290" x2="600" y2="290" stroke="#B8A890" strokeWidth="1" />
        <line x1="200" y1="390" x2="600" y2="390" stroke="#B8A890" strokeWidth="1" />

        {/* Main Roof */}
        <polygon points="175,240 400,130 625,240" fill="url(#roofGradient)" stroke="#5D2E0C" strokeWidth="2" />
        <polygon points="400,130 400,240 175,240" fill="#4A2510" opacity="0.3" />
        
        {/* Clock tower */}
        <rect x="358" y="80" width="84" height="65" fill="url(#buildingGradient)" stroke="#8B7355" strokeWidth="2" rx="2" />
        <polygon points="345,80 400,35 455,80" fill="url(#roofGradient)" stroke="#5D2E0C" strokeWidth="2" />
        
        {/* Clock face */}
        <circle cx="400" cy="108" r="22" fill="#F5F0E6" stroke="#5D4E37" strokeWidth="3" />
        <circle cx="400" cy="108" r="18" fill="#FFF8F0" />
        {/* Clock markers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={angle}
            x1={400 + Math.cos((angle - 90) * Math.PI / 180) * 14}
            y1={108 + Math.sin((angle - 90) * Math.PI / 180) * 14}
            x2={400 + Math.cos((angle - 90) * Math.PI / 180) * 16}
            y2={108 + Math.sin((angle - 90) * Math.PI / 180) * 16}
            stroke="#5D4E37"
            strokeWidth={angle % 90 === 0 ? 2 : 1}
          />
        ))}
        {/* Clock hands */}
        <motion.line
          x1="400"
          y1="108"
          x2="400"
          y2="95"
          stroke="#3D3225"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 108px' }}
        />
        <motion.line
          x1="400"
          y1="108"
          x2="408"
          y2="108"
          stroke="#5D4E37"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 108px' }}
        />
        <circle cx="400" cy="108" r="3" fill="#3D3225" />

        {/* Windows - Row 1 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`window1-${i}`}>
            <rect
              x={225 + i * 75}
              y="260"
              width="32"
              height="45"
              fill={progress > (i + 1) * 15 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#5D4E37"
              strokeWidth="2"
              rx="1"
            />
            <line x1={241 + i * 75} y1="260" x2={241 + i * 75} y2="305" stroke="#5D4E37" strokeWidth="1.5" />
            <line x1={225 + i * 75} y1="282" x2={257 + i * 75} y2="282" stroke="#5D4E37" strokeWidth="1.5" />
            {progress > (i + 1) * 15 && (
              <rect x={227 + i * 75} y="262" width="6" height="12" fill="white" opacity="0.3" rx="1" />
            )}
          </g>
        ))}

        {/* Windows - Row 2 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`window2-${i}`}>
            <rect
              x={225 + i * 75}
              y="330"
              width="32"
              height="45"
              fill={progress > (i + 6) * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#5D4E37"
              strokeWidth="2"
              rx="1"
            />
            <line x1={241 + i * 75} y1="330" x2={241 + i * 75} y2="375" stroke="#5D4E37" strokeWidth="1.5" />
            <line x1={225 + i * 75} y1="352" x2={257 + i * 75} y2="352" stroke="#5D4E37" strokeWidth="1.5" />
            {progress > (i + 6) * 10 && (
              <rect x={227 + i * 75} y="332" width="6" height="12" fill="white" opacity="0.3" rx="1" />
            )}
          </g>
        ))}

        {/* Main Door */}
        <g>
          {/* Door frame */}
          <rect x="362" y="395" width="76" height="85" fill="#3D3225" stroke="#2D2520" strokeWidth="3" rx="2" />
          
          {/* Door arch */}
          <path d="M362,395 Q400,375 438,395" fill="none" stroke="#5D4E37" strokeWidth="4" />
          
          {/* Light from inside */}
          {doorOpen && (
            <motion.rect
              x="367"
              y="400"
              width="66"
              height="80"
              fill="url(#doorLight)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              filter="url(#glow)"
            />
          )}
          
          {/* Left door panel */}
          <motion.g
            animate={doorOpen ? { rotateY: -65, x: -4 } : { rotateY: 0, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: '367px 440px' }}
          >
            <rect x="367" y="400" width="31" height="75" fill="url(#doorGradient)" stroke="#2D2520" strokeWidth="2" rx="1" />
            <rect x="371" y="408" width="23" height="28" fill="#4A3F32" stroke="#3D3225" strokeWidth="1" />
            <rect x="371" y="442" width="23" height="28" fill="#4A3F32" stroke="#3D3225" strokeWidth="1" />
            <circle cx="392" cy="442" r="3" fill="#C9A66B" />
          </motion.g>
          
          {/* Right door panel */}
          <motion.g
            animate={doorOpen ? { rotateY: 65, x: 4 } : { rotateY: 0, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: '433px 440px' }}
          >
            <rect x="402" y="400" width="31" height="75" fill="url(#doorGradient)" stroke="#2D2520" strokeWidth="2" rx="1" />
            <rect x="406" y="408" width="23" height="28" fill="#4A3F32" stroke="#3D3225" strokeWidth="1" />
            <rect x="406" y="442" width="23" height="28" fill="#4A3F32" stroke="#3D3225" strokeWidth="1" />
            <circle cx="408" cy="442" r="3" fill="#C9A66B" />
          </motion.g>
        </g>

        {/* Stone steps */}
        <rect x="345" y="480" width="110" height="10" fill="#A89880" stroke="#8B7355" strokeWidth="1" rx="1" />
        <rect x="335" y="490" width="130" height="10" fill="#9A8870" stroke="#8B7355" strokeWidth="1" rx="1" />
        <rect x="325" y="500" width="150" height="12" fill="#8A7860" stroke="#8B7355" strokeWidth="1" rx="1" />

        {/* Columns */}
        <rect x="218" y="240" width="22" height="240" fill="#D4C4B0" stroke="#B8A890" strokeWidth="1" rx="2" />
        <rect x="560" y="240" width="22" height="240" fill="#D4C4B0" stroke="#B8A890" strokeWidth="1" rx="2" />
        <rect x="215" y="235" width="28" height="10" fill="#C4B49C" rx="1" />
        <rect x="557" y="235" width="28" height="10" fill="#C4B49C" rx="1" />

        {/* Flag pole */}
        <line x1="400" y1="35" x2="400" y2="-15" stroke="#5D4E37" strokeWidth="3" />
        <motion.g
          animate={{ rotate: [0, 3, 0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '400px -15px' }}
        >
          <polygon points="400,-15 435,-5 400,5" fill="#8B4513" />
        </motion.g>
      </motion.g>

      {/* Left Wing */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="105" y="320" width="105" height="160" fill="url(#buildingGradient)" stroke="#8B7355" strokeWidth="2" rx="2" />
        <polygon points="90,320 157,265 225,320" fill="url(#roofGradient)" stroke="#5D2E0C" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <g key={`left-window-${i}`}>
            <rect
              x={118 + i * 48}
              y="350"
              width="28"
              height="38"
              fill={progress > 70 + i * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#5D4E37"
              strokeWidth="2"
              rx="1"
            />
            <line x1={132 + i * 48} y1="350" x2={132 + i * 48} y2="388" stroke="#5D4E37" strokeWidth="1.5" />
            <line x1={118 + i * 48} y1="369" x2={146 + i * 48} y2="369" stroke="#5D4E37" strokeWidth="1.5" />
          </g>
        ))}
        
        <rect x="142" y="420" width="26" height="60" fill="url(#doorGradient)" stroke="#2D2520" strokeWidth="2" rx="1" />
      </motion.g>

      {/* Right Wing */}
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="590" y="320" width="105" height="160" fill="url(#buildingGradient)" stroke="#8B7355" strokeWidth="2" rx="2" />
        <polygon points="575,320 642,265 710,320" fill="url(#roofGradient)" stroke="#5D2E0C" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <g key={`right-window-${i}`}>
            <rect
              x={603 + i * 48}
              y="350"
              width="28"
              height="38"
              fill={progress > 80 + i * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#5D4E37"
              strokeWidth="2"
              rx="1"
            />
            <line x1={617 + i * 48} y1="350" x2={617 + i * 48} y2="388" stroke="#5D4E37" strokeWidth="1.5" />
            <line x1={603 + i * 48} y1="369" x2={631 + i * 48} y2="369" stroke="#5D4E37" strokeWidth="1.5" />
          </g>
        ))}
        
        <rect x="632" y="420" width="26" height="60" fill="url(#doorGradient)" stroke="#2D2520" strokeWidth="2" rx="1" />
      </motion.g>

      {/* Path to school */}
      <ellipse cx="400" cy="540" rx="70" ry="12" fill="#8A7860" />
      <ellipse cx="400" cy="555" rx="55" ry="10" fill="#7A6850" />
      <ellipse cx="400" cy="568" rx="40" ry="8" fill="#6A5840" />

      {/* Subtle falling leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.ellipse
          key={`leaf-${i}`}
          cx={100 + i * 90}
          cy={80 + (i % 3) * 50}
          rx={4}
          ry={2}
          fill="#8B7355"
          opacity={0.5}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ 
            x: [0, 40, 80], 
            y: [0, 150, 400],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10 + (i % 3) * 3,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "linear"
          }}
        />
      ))}

      {/* Birds silhouette */}
      {[0, 1].map((i) => (
        <motion.g
          key={`bird-${i}`}
          animate={{ x: [-50, 850] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, delay: i * 8 }}
        >
          <path
            d={`M${80 + i * 40},${70 + i * 25} Q${90 + i * 40},${60 + i * 25} ${100 + i * 40},${70 + i * 25} Q${110 + i * 40},${60 + i * 25} ${120 + i * 40},${70 + i * 25}`}
            fill="none"
            stroke="#2C3E50"
            strokeWidth="2"
          />
        </motion.g>
      ))}

      {/* School name sign */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="295" y="195" width="210" height="32" fill="#F5F0E6" stroke="#8B7355" strokeWidth="2" rx="3" />
        <text x="400" y="217" textAnchor="middle" fill="#3D3225" fontSize="16" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="2">
          CYNIRA SCHOOL
        </text>
      </motion.g>
    </svg>
  );
};

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDoorOpen(true);
          setTimeout(() => setIsZooming(true), 800);
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
      setTimeout(handleZoomComplete, 1500);
    }
  }, [isZooming]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #2C3E50 0%, #4A5568 40%, #8B7355 80%, #C9A66B 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* School illustration */}
          <motion.div
            className="w-full max-w-5xl px-4 relative"
            animate={isZooming ? {
              scale: 6,
              y: 380,
              x: 0,
              opacity: 0
            } : {
              scale: 1,
              y: 0,
              x: 0,
              opacity: 1
            }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: '50% 72%' }}
          >
            <AnimeSchool progress={progress} doorOpen={doorOpen} />
          </motion.div>

          {/* Loading UI - Professional style */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 px-8"
            animate={isZooming ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="relative h-2 bg-black/20 rounded-full overflow-hidden border border-amber-900/30 backdrop-blur-sm">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #8B7355, #C9A66B, #DEB887)',
                    boxShadow: '0 0 15px rgba(201, 166, 107, 0.4)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                
                <motion.div
                  className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-48, 400] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            {/* Loading text */}
            <div className="flex items-center gap-4">
              <span className="text-amber-100/80 font-medium text-sm tracking-wide">Loading</span>
              <span className="text-amber-100 font-semibold text-lg">{progress}%</span>
            </div>

            {/* Minimal dots indicator */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-amber-200/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Subtle corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-amber-200/20" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-amber-200/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-amber-200/20" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-amber-200/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
