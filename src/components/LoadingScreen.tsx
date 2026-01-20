import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Rocket component that orbits around
const Rocket = ({ angle }: { angle: number }) => {
  const radius = 180;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  const rotation = angle + 90;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Rocket body */}
      <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]">
        {/* Rocket trail/flame */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: '20px 55px' }}
        >
          <polygon points="15,50 20,70 25,50" fill="url(#flameGradient)" />
          <polygon points="17,50 20,62 23,50" fill="#FFD700" />
        </motion.g>
        
        {/* Rocket body */}
        <defs>
          <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#2d2d44" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00ff87" />
          </linearGradient>
        </defs>
        
        {/* Main body */}
        <path d="M20,5 L30,40 L30,50 L10,50 L10,40 Z" fill="url(#rocketGradient)" stroke="#00d4ff" strokeWidth="1.5" />
        
        {/* Nose cone */}
        <path d="M20,0 L28,15 L12,15 Z" fill="#00d4ff" />
        
        {/* Window */}
        <circle cx="20" cy="25" r="6" fill="url(#windowGlow)" />
        <circle cx="20" cy="25" r="4" fill="#0a0a12" />
        <circle cx="18" cy="23" r="1.5" fill="rgba(255,255,255,0.6)" />
        
        {/* Fins */}
        <polygon points="10,45 0,55 10,50" fill="#ff6b35" stroke="#00d4ff" strokeWidth="0.5" />
        <polygon points="30,45 40,55 30,50" fill="#ff6b35" stroke="#00d4ff" strokeWidth="0.5" />
        
        {/* Details */}
        <line x1="12" y1="35" x2="28" y2="35" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="40" x2="28" y2="40" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
      </svg>
    </motion.div>
  );
};

// Trail particles behind rocket
const TrailParticle = ({ angle, delay }: { angle: number; delay: number }) => {
  const radius = 180;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        background: 'linear-gradient(135deg, #00d4ff, #00ff87)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
      }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: [0.8, 0], scale: [1, 0] }}
      transition={{ duration: 0.5, delay }}
    />
  );
};

// Floating tech particles
const TechParticle = ({ index }: { index: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3 + index * 0.5,
        repeat: Infinity,
        delay: index * 0.3,
      }}
    />
  );
};

// Orbiting ring
const OrbitRing = ({ size, delay, reverse }: { size: number; delay: number; reverse?: boolean }) => (
  <motion.div
    className="absolute border border-primary/20 rounded-full"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      rotate: reverse ? -360 : 360,
    }}
    transition={{
      opacity: { duration: 2, repeat: Infinity },
      rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: 'linear' },
      delay,
    }}
  />
);

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [rocketAngle, setRocketAngle] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const logoText = "CYNIRA";
  const subText = "SCHOOL";
  
  // Calculate which letters should be visible based on progress
  const visibleLogoLetters = Math.floor((progress / 100) * logoText.length);
  const visibleSubLetters = progress >= 70 ? Math.floor(((progress - 70) / 30) * subText.length) : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Rocket orbit animation
  useEffect(() => {
    const rocketInterval = setInterval(() => {
      setRocketAngle(prev => (prev + 4) % 360);
    }, 30);

    return () => clearInterval(rocketInterval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onLoadingComplete(), 400);
      }, 600);
    }
  }, [isComplete, onLoadingComplete]);

  // Generate trail particles
  const trailParticles = [];
  for (let i = 1; i <= 8; i++) {
    trailParticles.push(
      <TrailParticle 
        key={`trail-${i}`} 
        angle={rocketAngle - i * 12} 
        delay={i * 0.03} 
      />
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Floating tech particles */}
          {[...Array(20)].map((_, i) => (
            <TechParticle key={`particle-${i}`} index={i} />
          ))}

          {/* Orbit rings */}
          <OrbitRing size={400} delay={0} />
          <OrbitRing size={320} delay={0.5} reverse />
          <OrbitRing size={240} delay={1} />

          {/* Main logo container */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            style={{ width: 400, height: 400 }}
            animate={isComplete ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Glowing background circle */}
            <motion.div
              className="absolute w-48 h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Trail particles */}
            {trailParticles}

            {/* Rocket */}
            <Rocket angle={rocketAngle} />

            {/* Logo text - Main */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex">
                {logoText.split('').map((letter, index) => (
                  <motion.span
                    key={`logo-${index}`}
                    className="text-6xl md:text-7xl font-display font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff 0%, #00ff87 50%, #ff6b35 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: index < visibleLogoLetters ? '0 0 30px rgba(0, 212, 255, 0.5)' : 'none',
                    }}
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={index < visibleLogoLetters ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    } : {
                      opacity: 0.1,
                      y: 0,
                      scale: 0.95,
                    }}
                    transition={{ 
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Subtext */}
              <div className="flex mt-2">
                {subText.split('').map((letter, index) => (
                  <motion.span
                    key={`sub-${index}`}
                    className="text-2xl md:text-3xl font-mono tracking-[0.3em]"
                    style={{
                      color: index < visibleSubLetters ? '#00ff87' : 'rgba(0, 255, 135, 0.1)',
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={index < visibleSubLetters ? {
                      opacity: 1,
                      x: 0,
                    } : {
                      opacity: 0.1,
                      x: 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Underline that builds */}
              <motion.div
                className="h-0.5 mt-4 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #00ff87, #ff6b35)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-16 flex flex-col items-center gap-4"
            animate={isComplete ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Circular progress */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(0, 212, 255, 0.1)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progress) / 100}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="50%" stopColor="#00ff87" />
                    <stop offset="100%" stopColor="#ff6b35" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary font-mono text-sm font-bold">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Loading text */}
            <div className="flex items-center gap-2">
              <motion.span
                className="text-muted-foreground text-sm font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                INITIALIZING
              </motion.span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
          <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-secondary/30" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

          {/* Scan line effect */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
