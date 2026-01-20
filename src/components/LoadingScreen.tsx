import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Anime-style school building SVG component - Bright daytime version
const AnimeSchool = ({ progress, doorOpen }: { progress: number; doorOpen: boolean }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full max-w-4xl mx-auto"
      style={{ filter: 'drop-shadow(0 10px 40px rgba(255, 200, 100, 0.3))' }}
    >
      {/* Sky gradient background - Bright sunny day */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="30%" stopColor="#98D8EF" />
          <stop offset="60%" stopColor="#B0E2FF" />
          <stop offset="100%" stopColor="#E0F4FF" />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="50%" stopColor="#FFE8CC" />
          <stop offset="100%" stopColor="#FFD9B3" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E85D4C" />
          <stop offset="50%" stopColor="#D14836" />
          <stop offset="100%" stopColor="#B83426" />
        </linearGradient>
        <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8E6FF" />
          <stop offset="50%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7CCD7C" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
        <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFEB3B" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#5D2E0C" />
        </linearGradient>
        <linearGradient id="doorLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="50%" stopColor="#FFEB99" />
          <stop offset="100%" stopColor="#FFD54F" />
        </linearGradient>
        <radialGradient id="sunRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="50%" stopColor="#FFEB3B" />
          <stop offset="100%" stopColor="#FFC107" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="innerShadow">
          <feOffset dx="2" dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite operator="out" in="SourceGraphic"/>
        </filter>
      </defs>

      {/* Background - Bright sky */}
      <rect x="0" y="0" width="800" height="600" fill="url(#skyGradient)" />

      {/* Sun with rays */}
      <motion.g
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="650" cy="100" r="60" fill="url(#sunRadial)" filter="url(#softGlow)" />
        {/* Sun rays */}
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={i}
            x1="650"
            y1="100"
            x2={650 + Math.cos((i * 30 * Math.PI) / 180) * 100}
            y2={100 + Math.sin((i * 30 * Math.PI) / 180) * 100}
            stroke="#FFE082"
            strokeWidth="3"
            opacity={0.6}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* Fluffy clouds */}
      <motion.g
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="150" cy="80" rx="60" ry="30" fill="white" opacity="0.9" />
        <ellipse cx="190" cy="70" rx="40" ry="25" fill="white" opacity="0.9" />
        <ellipse cx="120" cy="90" rx="35" ry="20" fill="white" opacity="0.8" />
      </motion.g>
      <motion.g
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="500" cy="60" rx="50" ry="25" fill="white" opacity="0.85" />
        <ellipse cx="540" cy="50" rx="35" ry="20" fill="white" opacity="0.9" />
        <ellipse cx="470" cy="70" rx="30" ry="18" fill="white" opacity="0.8" />
      </motion.g>

      {/* Ground - Green grass */}
      <ellipse cx="400" cy="520" rx="500" ry="100" fill="url(#grassGradient)" />
      <ellipse cx="400" cy="550" rx="450" ry="60" fill="#45A049" />

      {/* Grass details */}
      {[...Array(40)].map((_, i) => (
        <motion.path
          key={`grass-${i}`}
          d={`M${50 + i * 18},${480 + (i % 3) * 10} Q${53 + i * 18},${460 + (i % 3) * 10} ${55 + i * 18},${475 + (i % 3) * 10}`}
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity }}
          style={{ transformOrigin: `${52 + i * 18}px ${480 + (i % 3) * 10}px` }}
        />
      ))}

      {/* Trees - Left side (more colorful and anime-style) */}
      <g>
        <rect x="50" y="380" width="20" height="100" fill="#8B5A2B" rx="3" />
        <motion.g
          animate={{ scale: [1, 1.03, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '60px 350px' }}
        >
          <ellipse cx="60" cy="350" rx="55" ry="70" fill="#4CAF50" />
          <ellipse cx="45" cy="330" rx="35" ry="45" fill="#66BB6A" />
          <ellipse cx="75" cy="340" rx="30" ry="40" fill="#81C784" />
          {/* Highlight */}
          <ellipse cx="50" cy="320" rx="15" ry="20" fill="#A5D6A7" opacity="0.7" />
        </motion.g>
      </g>

      {/* Trees - Right side */}
      <g>
        <rect x="720" y="390" width="18" height="90" fill="#8B5A2B" rx="3" />
        <motion.g
          animate={{ scale: [1, 1.03, 1], rotate: [0, -1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          style={{ transformOrigin: '729px 360px' }}
        >
          <ellipse cx="729" cy="360" rx="50" ry="65" fill="#4CAF50" />
          <ellipse cx="715" cy="340" rx="30" ry="40" fill="#66BB6A" />
          <ellipse cx="745" cy="350" rx="28" ry="35" fill="#81C784" />
          <ellipse cx="720" cy="330" rx="12" ry="18" fill="#A5D6A7" opacity="0.7" />
        </motion.g>
      </g>

      {/* Flower bushes */}
      {[180, 280, 520, 620].map((x, idx) => (
        <g key={`bush-${idx}`}>
          <ellipse cx={x} cy="485" rx="25" ry="15" fill="#388E3C" />
          {[0, 1, 2, 3, 4].map((f) => (
            <motion.circle
              key={f}
              cx={x - 15 + f * 8}
              cy={478 + (f % 2) * 5}
              r="5"
              fill={['#FF6B6B', '#FFD93D', '#FF69B4', '#FF6B6B', '#FFD93D'][f]}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: f * 0.2 }}
            />
          ))}
        </g>
      ))}

      {/* Main Building - Anime style warm colors */}
      <motion.g
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Building base with warm cream color */}
        <rect x="200" y="240" width="400" height="240" fill="url(#buildingGradient)" stroke="#D4A574" strokeWidth="3" rx="5" />
        
        {/* Building texture lines */}
        <line x1="200" y1="300" x2="600" y2="300" stroke="#E8C9A0" strokeWidth="1" />
        <line x1="200" y1="360" x2="600" y2="360" stroke="#E8C9A0" strokeWidth="1" />

        {/* Main Roof - Bright red */}
        <polygon points="170,240 400,120 630,240" fill="url(#roofGradient)" stroke="#B83426" strokeWidth="3" />
        {/* Roof shading */}
        <polygon points="400,120 400,240 170,240" fill="#C9453A" opacity="0.3" />
        
        {/* Roof tiles pattern */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`tile-${i}`} x1={230 + i * 80} y1={230 - i * 2} x2={400} y2="140" stroke="#D14836" strokeWidth="1" opacity="0.5" />
        ))}
        
        {/* Clock tower */}
        <rect x="355" y="70" width="90" height="70" fill="url(#buildingGradient)" stroke="#D4A574" strokeWidth="2" rx="3" />
        <polygon points="340,70 400,25 460,70" fill="url(#roofGradient)" stroke="#B83426" strokeWidth="2" />
        
        {/* Clock face */}
        <circle cx="400" cy="100" r="25" fill="#FFF8DC" stroke="#8B4513" strokeWidth="3" />
        <circle cx="400" cy="100" r="20" fill="#FFFEF0" />
        {/* Clock numbers */}
        <text x="400" y="88" textAnchor="middle" fill="#5D2E0C" fontSize="8" fontWeight="bold">12</text>
        <text x="417" y="103" textAnchor="middle" fill="#5D2E0C" fontSize="8" fontWeight="bold">3</text>
        <text x="400" y="118" textAnchor="middle" fill="#5D2E0C" fontSize="8" fontWeight="bold">6</text>
        <text x="383" y="103" textAnchor="middle" fill="#5D2E0C" fontSize="8" fontWeight="bold">9</text>
        {/* Clock hands */}
        <motion.line
          x1="400"
          y1="100"
          x2="400"
          y2="85"
          stroke="#5D2E0C"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 100px' }}
        />
        <motion.line
          x1="400"
          y1="100"
          x2="410"
          y2="100"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '400px 100px' }}
        />
        <circle cx="400" cy="100" r="3" fill="#5D2E0C" />

        {/* Windows - Row 1 with bright reflections */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={`window1-${i}`}>
            <rect
              x={225 + i * 75}
              y="260"
              width="35"
              height="50"
              fill={progress > (i + 1) * 15 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#8B4513"
              strokeWidth="2"
              rx="2"
            />
            {/* Window frame cross */}
            <line x1={242.5 + i * 75} y1="260" x2={242.5 + i * 75} y2="310" stroke="#8B4513" strokeWidth="2" />
            <line x1={225 + i * 75} y1="285" x2={260 + i * 75} y2="285" stroke="#8B4513" strokeWidth="2" />
            {/* Window reflection */}
            <rect x={227 + i * 75} y="262" width="8" height="15" fill="white" opacity="0.4" rx="1" />
          </motion.g>
        ))}

        {/* Windows - Row 2 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={`window2-${i}`}>
            <rect
              x={225 + i * 75}
              y="330"
              width="35"
              height="50"
              fill={progress > (i + 6) * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#8B4513"
              strokeWidth="2"
              rx="2"
            />
            <line x1={242.5 + i * 75} y1="330" x2={242.5 + i * 75} y2="380" stroke="#8B4513" strokeWidth="2" />
            <line x1={225 + i * 75} y1="355" x2={260 + i * 75} y2="355" stroke="#8B4513" strokeWidth="2" />
            <rect x={227 + i * 75} y="332" width="8" height="15" fill="white" opacity="0.4" rx="1" />
          </motion.g>
        ))}

        {/* Main Door with opening animation */}
        <g>
          {/* Door frame */}
          <rect x="360" y="390" width="80" height="90" fill="#5D2E0C" stroke="#3D1E08" strokeWidth="3" rx="3" />
          
          {/* Door arch decoration */}
          <path d="M360,390 Q400,365 440,390" fill="none" stroke="#8B4513" strokeWidth="4" />
          <path d="M365,390 Q400,370 435,390" fill="none" stroke="#D4A574" strokeWidth="2" />
          
          {/* Light from inside when door opens */}
          {doorOpen && (
            <motion.rect
              x="365"
              y="395"
              width="70"
              height="85"
              fill="url(#doorLight)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              filter="url(#glow)"
            />
          )}
          
          {/* Left door panel */}
          <motion.g
            animate={doorOpen ? { 
              rotateY: -70,
              x: -5
            } : { 
              rotateY: 0,
              x: 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: '365px 435px' }}
          >
            <rect x="365" y="395" width="33" height="80" fill="url(#doorGradient)" stroke="#3D1E08" strokeWidth="2" rx="2" />
            {/* Door panels */}
            <rect x="370" y="400" width="23" height="30" fill="#6B4423" stroke="#5D2E0C" strokeWidth="1" rx="1" />
            <rect x="370" y="438" width="23" height="30" fill="#6B4423" stroke="#5D2E0C" strokeWidth="1" rx="1" />
            <circle cx="390" cy="440" r="4" fill="#FFD700" />
          </motion.g>
          
          {/* Right door panel */}
          <motion.g
            animate={doorOpen ? { 
              rotateY: 70,
              x: 5
            } : { 
              rotateY: 0,
              x: 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: '435px 435px' }}
          >
            <rect x="402" y="395" width="33" height="80" fill="url(#doorGradient)" stroke="#3D1E08" strokeWidth="2" rx="2" />
            <rect x="407" y="400" width="23" height="30" fill="#6B4423" stroke="#5D2E0C" strokeWidth="1" rx="1" />
            <rect x="407" y="438" width="23" height="30" fill="#6B4423" stroke="#5D2E0C" strokeWidth="1" rx="1" />
            <circle cx="410" cy="440" r="4" fill="#FFD700" />
          </motion.g>
        </g>

        {/* Steps - Stone style */}
        <rect x="340" y="480" width="120" height="12" fill="#D4C4A8" stroke="#A89880" strokeWidth="2" rx="2" />
        <rect x="330" y="492" width="140" height="12" fill="#C4B498" stroke="#A89880" strokeWidth="2" rx="2" />
        <rect x="320" y="504" width="160" height="12" fill="#B4A488" stroke="#A89880" strokeWidth="2" rx="2" />

        {/* Decorative columns */}
        <rect x="215" y="240" width="25" height="240" fill="#FFE8CC" stroke="#D4A574" strokeWidth="2" rx="3" />
        <rect x="560" y="240" width="25" height="240" fill="#FFE8CC" stroke="#D4A574" strokeWidth="2" rx="3" />
        {/* Column capitals */}
        <rect x="210" y="235" width="35" height="12" fill="#D4A574" rx="2" />
        <rect x="555" y="235" width="35" height="12" fill="#D4A574" rx="2" />

        {/* Flag pole with flag */}
        <line x1="400" y1="25" x2="400" y2="-25" stroke="#666" strokeWidth="4" />
        <motion.g
          animate={{ rotate: [0, 8, 0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ transformOrigin: '400px -25px' }}
        >
          <polygon points="400,-25 450,-10 400,5" fill="#FF6B6B" />
          <polygon points="400,-25 450,-10 400,5" fill="#FF8A80" opacity="0.5" />
          {/* Flag design */}
          <circle cx="420" cy="-10" r="8" fill="#FFD93D" />
        </motion.g>
      </motion.g>

      {/* Left Wing */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="100" y="320" width="110" height="160" fill="url(#buildingGradient)" stroke="#D4A574" strokeWidth="3" rx="3" />
        <polygon points="85,320 155,260 225,320" fill="url(#roofGradient)" stroke="#B83426" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <g key={`left-window-${i}`}>
            <rect
              x={115 + i * 50}
              y="350"
              width="30"
              height="40"
              fill={progress > 70 + i * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#8B4513"
              strokeWidth="2"
              rx="2"
            />
            <line x1={130 + i * 50} y1="350" x2={130 + i * 50} y2="390" stroke="#8B4513" strokeWidth="1.5" />
            <line x1={115 + i * 50} y1="370" x2={145 + i * 50} y2="370" stroke="#8B4513" strokeWidth="1.5" />
          </g>
        ))}
        
        <rect x="140" y="420" width="30" height="60" fill="url(#doorGradient)" stroke="#3D1E08" strokeWidth="2" rx="2" />
      </motion.g>

      {/* Right Wing */}
      <motion.g
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect x="590" y="320" width="110" height="160" fill="url(#buildingGradient)" stroke="#D4A574" strokeWidth="3" rx="3" />
        <polygon points="575,320 645,260 715,320" fill="url(#roofGradient)" stroke="#B83426" strokeWidth="2" />
        
        {[0, 1].map((i) => (
          <g key={`right-window-${i}`}>
            <rect
              x={605 + i * 50}
              y="350"
              width="30"
              height="40"
              fill={progress > 80 + i * 10 ? "url(#windowGlow)" : "url(#windowGlass)"}
              stroke="#8B4513"
              strokeWidth="2"
              rx="2"
            />
            <line x1={620 + i * 50} y1="350" x2={620 + i * 50} y2="390" stroke="#8B4513" strokeWidth="1.5" />
            <line x1={605 + i * 50} y1="370" x2={635 + i * 50} y2="370" stroke="#8B4513" strokeWidth="1.5" />
          </g>
        ))}
        
        <rect x="630" y="420" width="30" height="60" fill="url(#doorGradient)" stroke="#3D1E08" strokeWidth="2" rx="2" />
      </motion.g>

      {/* Stone path */}
      <ellipse cx="400" cy="540" rx="80" ry="15" fill="#C4B498" />
      <ellipse cx="400" cy="560" rx="60" ry="12" fill="#B4A488" />
      <ellipse cx="400" cy="575" rx="45" ry="10" fill="#A49478" />

      {/* Butterflies */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`butterfly-${i}`}
          animate={{
            x: [0, 50, 100, 50, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.5 }}
        >
          <motion.ellipse
            cx={200 + i * 200}
            cy={200 + i * 30}
            rx="8"
            ry="5"
            fill={['#FF69B4', '#FFD93D', '#87CEEB'][i]}
            animate={{ scaleX: [1, 0.3, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.ellipse
            cx={200 + i * 200 + 12}
            cy={200 + i * 30}
            rx="8"
            ry="5"
            fill={['#FF69B4', '#FFD93D', '#87CEEB'][i]}
            animate={{ scaleX: [1, 0.3, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </motion.g>
      ))}

      {/* Sparkles / Light particles */}
      {[...Array(15)].map((_, i) => (
        <motion.g key={`sparkle-${i}`}>
          <motion.circle
            cx={100 + i * 50}
            cy={150 + (i % 4) * 50}
            r={2}
            fill="#FFD700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        </motion.g>
      ))}

      {/* Sakura petals - Pink and floating */}
      {[...Array(20)].map((_, i) => (
        <motion.ellipse
          key={`petal-${i}`}
          cx={50 + i * 40}
          cy={50 + (i % 4) * 40}
          rx={5}
          ry={3}
          fill="#FFB7C5"
          opacity={0.8}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ 
            x: [0, 80 + (i % 3) * 40, 160 + (i % 3) * 40], 
            y: [0, 200, 500],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}

      {/* Birds */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`bird-${i}`}
          animate={{ x: [-100, 900] }}
          transition={{ duration: 15 + i * 3, repeat: Infinity, delay: i * 4 }}
        >
          <path
            d={`M${100 + i * 50},${80 + i * 20} Q${110 + i * 50},${70 + i * 20} ${120 + i * 50},${80 + i * 20} Q${130 + i * 50},${70 + i * 20} ${140 + i * 50},${80 + i * 20}`}
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
        </motion.g>
      ))}

      {/* School name sign - Cheerful style */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="290" y="195" width="220" height="35" fill="#FFF8DC" stroke="#D4A574" strokeWidth="3" rx="5" />
        <rect x="295" y="200" width="210" height="25" fill="#FFFEF0" rx="3" />
        <text x="400" y="220" textAnchor="middle" fill="#8B4513" fontSize="18" fontFamily="Georgia, serif" fontWeight="bold">
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
          // First open the door
          setDoorOpen(true);
          // Then start zooming after door opens
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
          style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #E0F4FF 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Anime-style school illustration */}
          <motion.div
            className="w-full max-w-5xl px-4 relative"
            animate={isZooming ? {
              scale: 6,
              y: 350,
              x: 0,
              opacity: 0
            } : {
              scale: 1,
              y: 0,
              x: 0,
              opacity: 1
            }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: '50% 72%' }} // Focus on the door area
          >
            <AnimeSchool progress={progress} doorOpen={doorOpen} />
          </motion.div>

          {/* Loading UI - Bright and cheerful */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 px-8"
            animate={isZooming ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="relative h-4 bg-white/60 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FFD93D, #FF6B6B, #FF69B4)',
                    boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{ x: [-64, 400] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            {/* Loading text */}
            <div className="flex items-center gap-3 bg-white/70 px-6 py-2 rounded-full shadow-md">
              <motion.span
                className="text-amber-600 font-bold text-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✨ Loading
              </motion.span>
              <span className="text-amber-800 font-bold text-xl">{progress}%</span>
            </div>

            {/* Decorative bouncing elements */}
            <div className="flex gap-3">
              {['🌸', '⭐', '🌸'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: i * 0.15 
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Decorative corner flowers */}
          <div className="absolute top-4 left-4 text-3xl opacity-70">🌺</div>
          <div className="absolute top-4 right-4 text-3xl opacity-70">🌻</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-70">🌷</div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-70">🌹</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
