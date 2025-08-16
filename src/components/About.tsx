import { Shield, Clock, Handshake, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trusted Expertise",
      description: "Years of experience guiding students through complex admission processes with proven success rates."
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance ensuring you never feel alone in your educational journey."
    },
    {
      icon: <Handshake className="h-8 w-8 text-secondary" />,
      title: "Strong Partnerships",
      description: "Direct relationships with top universities worldwide, opening doors to exclusive opportunities."
    },
    {
      icon: <Target className="h-8 w-8 text-success" />,
      title: "Smart Solutions",
      description: "Personalized strategies tailored to your academic goals, budget, and career aspirations."
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up">About EUFES</h2>
            <p className="section-subtitle fade-in-up">
              EUForeignEdu is more than just an education consultancy, we’re your dedicated partner in global academic success. With a mission to bridge the gap between ambition and opportunity,
               we specialize in helping students gain admission to top-tier universities around the world.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6 fade-in-up">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                Your Gateway to World-Class Education
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                At EUFES (EU Foreign Education Solutions), we believe that quality education should know no borders. 
                Since our inception, we have been dedicated to breaking down barriers and creating pathways for 
                ambitious students to access top-tier international universities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive approach combines deep industry knowledge, personalized counseling, and 
                strategic partnerships with prestigious institutions worldwide. We don't just help you apply – 
                we ensure you succeed.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-primary font-semibold italic">
                  "Our mission is simple: to make world-class education accessible to every ambitious 
                  student, regardless of their background or circumstances."
                </p>
              </div>
               <p className="text-muted-foreground leading-relaxed">
                Our team is made up of passionate admission experts, and student success strategists who understand what it takes to turn your dreams of studying abroad into reality. Whether you’re aiming for the UK, US, Canada, Europe, or Australia, 
                we’ve guided thousands of students through every step from choosing the right university to visa support and everything in between.
              </p>
            </div>

            {/* Stats/Achievements */}
            <div className="space-y-6 fade-in-up stagger-animation">
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">17+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
                  <div className="text-2xl font-bold text-accent mb-1">2+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-soft border border-border text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary-foreground mb-2">3000+</div>
                <div className="text-primary-foreground/90">Successful Students</div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="service-card text-center fade-in-up stagger-animation"
                style={{ '--stagger-delay': `${index * 150}ms` } as React.CSSProperties}
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;