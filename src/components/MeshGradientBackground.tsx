import { useEffect, useRef } from 'react';

interface MeshGradientBackgroundProps {
  children: React.ReactNode;
}

const MeshGradientBackground = ({ children }: MeshGradientBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const animate = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      container.style.setProperty('--mouse-x', `${currentX}%`);
      container.style.setProperty('--mouse-y', `${currentY}%`);

      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mesh-gradient min-h-screen w-full transition-all duration-700 ease-out"
    >
      {children}
    </div>
  );
};

export default MeshGradientBackground;
