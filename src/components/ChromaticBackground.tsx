import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ChromaticBackgroundProps {
  children: React.ReactNode;
  tint?: string;
  accent?: string;
  glowIntensity?: number;
}

const ChromaticBackground = ({ 
  children, 
  tint = 'hsl(175, 80%, 50%)',
  accent = 'hsl(280, 70%, 50%)',
  glowIntensity = 45
}: ChromaticBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Raw mouse position
  const mX = useMotionValue(50);
  const mY = useMotionValue(50);
  
  // Spring-based smooth following (liquid feel)
  const springX = useSpring(mX, { stiffness: 30, damping: 25 });
  const springY = useSpring(mY, { stiffness: 30, damping: 25 });
  
  // Transform to gradient string
  const background = useTransform(
    [springX, springY],
    ([x, y]) => `
      radial-gradient(circle at ${x}% ${y}%, ${tint} 0%, transparent ${glowIntensity}%),
      radial-gradient(circle at ${100 - (x as number)}% ${100 - (y as number)}%, ${accent} 0%, transparent ${glowIntensity}%),
      radial-gradient(circle at 50% 50%, ${tint}33 0%, transparent 80%)
    `
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      mX.set(xPct);
      mY.set(yPct);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [mX, mY]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Chromatic gradient layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background,
          filter: 'blur(80px) saturate(1.5)',
          opacity: 0.6,
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {children}
    </div>
  );
};

export default ChromaticBackground;
