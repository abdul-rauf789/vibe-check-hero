import { motion } from 'framer-motion';
import ChromaticBackground from './ChromaticBackground';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <ChromaticBackground
      tint="hsl(175, 80%, 50%)"
      accent="hsl(280, 70%, 50%)"
      glowIntensity={45}
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.div 
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle pre-heading */}
          <motion.p 
            className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Future is Now
          </motion.p>

          {/* Main fluid heading */}
          <h1 className="fluid-text mb-8 text-foreground">
            {['Design.', 'Iterate.', 'Launch.'].map((word, i) => (
              <motion.span
                key={word}
                className={`block ${i === 1 ? 'text-gradient' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + i * 0.15, 
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p 
            className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Fluid movement for elite interfaces. 
            Transform ideas into reality.
          </motion.p>

          {/* Magnetic CTA Button */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <MagneticButton 
              data-lovable-cta="hero-primary"
              onClick={() => console.log('CTA clicked')}
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.p 
            className="mt-12 text-sm text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Trusted by 10,000+ creators worldwide
          </motion.p>
        </motion.div>
      </div>
    </ChromaticBackground>
  );
};

export default HeroSection;
