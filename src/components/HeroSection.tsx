import MeshGradientBackground from './MeshGradientBackground';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <MeshGradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Subtle pre-heading */}
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            The Future is Now
          </p>

          {/* Main fluid heading */}
          <h1 className="fluid-text mb-8 text-foreground">
            <span className="block">Create.</span>
            <span className="block text-gradient">Iterate.</span>
            <span className="block">Launch.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground md:text-xl">
            Transform your ideas into reality with fluid design 
            and seamless experiences that captivate.
          </p>

          {/* Magnetic CTA Button */}
          <div className="flex justify-center">
            <MagneticButton 
              data-lovable-cta="hero-primary"
              onClick={() => console.log('CTA clicked')}
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </div>

          {/* Social proof or secondary text */}
          <p className="mt-12 text-sm text-muted-foreground/60">
            Trusted by 10,000+ creators worldwide
          </p>
        </div>
      </div>
    </MeshGradientBackground>
  );
};

export default HeroSection;
