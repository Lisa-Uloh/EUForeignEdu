import { ArrowRight, Globe, Users, Award } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';
import { Link, useLocation } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="International students studying abroad" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-6">
            <Award className="h-4 w-4 text-secondary mr-2" />
            <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ Students</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title mb-6">
            Elevating Learning 
            <span className="text-secondary"> Beyond Borders</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mb-8">
            We’ve helped 3,000+ students secure admissions into top universities worldwide. Your success story begins here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-hero group">
             <Link to="/contact" className="">
                              Free Consultation  
                              {/* <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> */}
                            </Link>
             
            </button>
            
            <button className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/30 px-6 py-3 rounded-lg font-medium transition-all duration-300">
              <Link to="/testimonials">
              View Success Stories
            </Link>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-6 w-6 text-secondary mr-2" />
                <span className="text-2xl font-bold text-primary-foreground">15+</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">Partner Universities</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-secondary mr-2" />
                <span className="text-2xl font-bold text-primary-foreground">500+</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">Successful Placements</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-secondary mr-2" />
                <span className="text-2xl font-bold text-primary-foreground">95%</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">Visa Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;