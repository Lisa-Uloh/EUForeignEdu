import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, GraduationCap } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Adaora Okafor",
      program: "MSc Computer Science",
      university: "University of Oxford",
      country: "United Kingdom",
      image: "👩🏿‍🎓",
      rating: 5,
      text: "EUFES made my dream of studying at Oxford a reality. Their personalized guidance through the application process and visa support was exceptional. I'm now pursuing my Master's in Computer Science, and it all started with their expert counseling.",
      year: "2023"
    },
    {
      name: "Chukwudi Nwankwo",
      program: "MBA",
      university: "Harvard Business School",
      country: "United States",
      image: "👨🏿‍💼",
      rating: 5,
      text: "The team at EUFES didn't just help me get admitted to Harvard - they prepared me for success. From GMAT prep to interview coaching, their comprehensive approach gave me the confidence to excel. Best investment I ever made!",
      year: "2022"
    },
    {
      name: "Fatima Ibrahim",
      program: "BEng Biomedical Engineering",
      university: "University of Toronto",
      country: "Canada",
      image: "👩🏽‍🔬",
      rating: 5,
      text: "As a first-generation university student, I was overwhelmed by the international application process. EUFES walked me through every step, secured a scholarship, and even helped with accommodation. Their 24/7 support was invaluable.",
      year: "2023"
    },
    {
      name: "Olumide Adebayo",
      program: "PhD Economics",
      university: "University of Melbourne",
      country: "Australia",
      image: "👨🏿‍🎓",
      rating: 5,
      text: "EUFES understood my research interests and matched me with the perfect supervisor at Melbourne. Their network and expertise in PhD applications is unmatched. Now I'm conducting groundbreaking research in development economics.",
      year: "2021"
    },
    {
      name: "Grace Okoro",
      program: "MSc Data Science",
      university: "ETH Zurich",
      country: "Switzerland",
      image: "👩🏿‍💻",
      rating: 5,
      text: "The scholarship guidance from EUFES was incredible. They helped me secure a full scholarship to ETH Zurich, one of the world's top technical universities. Their expertise in European applications is outstanding.",
      year: "2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up">Student Success Stories</h2>
            <p className="section-subtitle fade-in-up">
              Real stories from real students who achieved their international education dreams with EUFES. 
              Your success story could be next.
            </p>
          </div>

          {/* Main Testimonial Display */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl shadow-medium p-8 md:p-12 fade-in-up">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Student Info */}
                <div className="text-center lg:text-left lg:min-w-[300px]">
                  <div className="text-6xl mb-4">{current.image}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{current.name}</h3>
                  <p className="text-muted-foreground mb-2">{current.program}</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">{current.university}</p>
                    <p className="text-sm text-muted-foreground">{current.country} • Class of {current.year}</p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start items-center mt-4 space-x-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="text-4xl text-primary/20 mb-4">"</div>
                  <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                    {current.text}
                  </blockquote>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <GraduationCap className="h-4 w-4" />
                    <span>Verified EUFES Graduate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card border border-border hover:bg-muted p-3 rounded-full shadow-soft transition-all duration-300 hover:shadow-medium"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card border border-border hover:bg-muted p-3 rounded-full shadow-soft transition-all duration-300 hover:shadow-medium"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-110' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground text-sm">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-muted-foreground text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;