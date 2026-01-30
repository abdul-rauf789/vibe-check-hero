import { useRef, useState } from 'react';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'magnetic-btn relative overflow-hidden rounded-full',
        'bg-primary text-primary-foreground',
        'px-8 py-4 text-lg font-medium tracking-tight',
        'border border-primary/20',
        'hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        'active:scale-95',
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-lovable-cta={dataLovableCta}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-300 hover:opacity-20" />
    </button>
  );
};

export default MagneticButton;
