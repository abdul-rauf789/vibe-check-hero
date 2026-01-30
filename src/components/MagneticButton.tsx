import { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  'data-lovable-cta'?: string;
  onClick?: () => void;
}

const MagneticButton = ({ 
  children, 
  className,
  'data-lovable-cta': dataLovableCta,
  onClick 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Spring-based magnetic effect
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  
  // Glow opacity
  const glowOpacity = useMotionValue(0);
  const glowSpring = useSpring(glowOpacity, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Magnetic pull within 150px
    if (distance < 150) {
      x.set(distanceX * 0.4);
      y.set(distanceY * 0.4);
      glowOpacity.set(1 - distance / 150);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-full',
        'bg-primary text-primary-foreground',
        'px-10 py-5 text-lg font-bold tracking-tight',
        'border border-primary/20',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        'cursor-pointer',
        className
      )}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-lovable-cta={dataLovableCta}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Internal glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          opacity: glowSpring,
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
      
      {/* Edge highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          opacity: glowSpring,
          boxShadow: '0 0 30px 5px hsl(var(--primary) / 0.5), inset 0 0 20px hsl(var(--primary) / 0.2)',
        }}
      />
    </motion.button>
  );
};

export default MagneticButton;
