import { Users, MapPin, BookOpen, FileCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Personalized Counseling",
      description: "One-on-one guidance sessions to understand your goals, assess your profile, and create a customized roadmap for your international education journey.",
      features: ["Academic Profile Assessment", "Career Goal Alignment", "Country & Course Selection", "Personal Development Planning"],
      highlight: "Free Initial Consultation"
    },
    {
      icon: <MapPin className="h-10 w-10 text-accent" />,
      title: "University Selection",
      description: "Strategic selection of universities that match your academic credentials, career aspirations, and budget constraints across multiple countries.",
      features: ["Institution Research", "Program Compatibility", "Scholarship Opportunities", "Campus Life Insights"],
      highlight: "15+ Partner Universities"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-secondary" />,
      title: "Entrance Exam Prep",
      description: "Comprehensive preparation for standardized tests including IELTS, TOEFL, SAT, GRE, GMAT with expert tutors and proven strategies.",
      features: ["Mock Tests & Practice", "Score Improvement Plans", "Test-taking Strategies", "Material & Resources"],
      highlight: "Average 20% Score Improvement"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-success" />,
      title: "Admissions Support",
      description: "End-to-end application assistance including document preparation, statement of purpose writing, and visa application support.",
      features: ["Application Management", "Document Verification", "SOP & Essay Writing", "Visa Processing"],
      highlight: "95% Success Rate"
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up">Our Services</h2>
            <p className="section-subtitle fade-in-up">
              Comprehensive support services designed to guide you through every step of your 
              international education journey, from initial consultation to successful enrollment.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card group fade-in-up stagger-animation"
                style={{ '--stagger-delay': `${index * 200}ms` } as React.CSSProperties}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted p-3 rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{service.title}</h3>
                      <div className="inline-flex items-center bg-secondary/10 text-secondary-dark px-3 py-1 rounded-full text-sm font-medium">
                        {service.highlight}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="btn-outline-primary w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-center fade-in-up">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Take the first step towards your international education goals. 
                Schedule a free consultation with our expert counselors today.
              </p>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary-dark px-8 py-4 rounded-lg font-semibold text-lg shadow-medium transition-all duration-300 hover:shadow-strong hover:scale-105">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;