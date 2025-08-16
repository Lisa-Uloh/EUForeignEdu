import { ExternalLink } from 'lucide-react';

const Partners = () => {
  const partners = [
    {
      name: "Middlesex University",
      country: "United Kingdom",
      logo: "🎓",
      // ranking: "#1 UK",
      programs: "40+ Programs"
    },
    {
      name: "Pace University",
      country: "United States",
      logo: "🏛️",
      // ranking: "#1 US",
      programs: "60+ Programs"
    },
    {
      name: "University of Toronto",
      country: "Canada",
      logo: "🍁",
      // ranking: "#1 Canada",
      programs: "50+ Programs"
    },
    {
      name: "University of Debrecen",
      country: "Hungary",
      logo: "🦘",
      // ranking: "#1 Australia",
      programs: "35+ Programs"
    },
    {
      name: "University of Nottingham",
      country: "UNited Kingdom",
      logo: "⚡",
      // ranking: "#1 Europe",
      programs: "25+ Programs"
    },
    {
      name: "Richmond University",
      country: "United States",
      logo: "🌸",
      // ranking: "#1 Asia",
      programs: "45+ Programs"
    },
    {
      name: "Wilfrid Laurier University",
      country: "Canada",
      logo: "🌷",
      // ranking: "Top 10 EU",
      programs: "30+ Programs"
    },
    {
      name: "Regenesys Business School",
      country: "south Africa",
      logo: "🔬",
      // ranking: "Top 5 EU",
      programs: "28+ Programs"
    }
  ];

  const countries = [
    { name: "United States", count: "4 Universities", flag: "🇺🇸" },
    { name: "United Kingdom", count: "29 Universities", flag: "🇬🇧" },
    { name: "Canada", count: "5 Universities", flag: "🇨🇦" },
    { name: "Hungary", count: "1 Universities", flag: "HU" },
    { name: "Germany", count: "1 Universities", flag: "🇩🇪" },
    { name: "South Africa", count: "1 Universities", flag: "SA" }
  ];

  return (
    <section id="partners" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up">Our University Partners</h2>
            <p className="section-subtitle fade-in-up">
              Strategic partnerships with world-renowned institutions across multiple countries, 
              ensuring you have access to the best educational opportunities globally.
            </p>
          </div>

          {/* Countries Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {countries.map((country, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-4 text-center shadow-soft hover:shadow-medium transition-all duration-300 fade-in-up stagger-animation"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <div className="text-2xl mb-2">{country.flag}</div>
                <h4 className="font-semibold text-sm text-primary mb-1">{country.name}</h4>
                <p className="text-xs text-muted-foreground">{country.count}</p>
              </div>
            ))}
          </div>

          {/* Partner Universities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="partner-card group fade-in-up stagger-animation"
                style={{ '--stagger-delay': `${index * 150}ms` } as React.CSSProperties}
              >
                <div className="text-center">
                  {/* Logo */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  
                  {/* University Info */}
                  <h3 className="font-bold text-primary mb-2 text-sm leading-tight">
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3">{partner.country}</p>
                  
                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {/* {partner.ranking} */}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {partner.programs}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Benefits */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-8 fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Partnership Benefits</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our direct partnerships provide exclusive advantages that give our students a competitive edge 
                in the admission process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-primary mb-2">Direct Access</h4>
                <p className="text-sm text-muted-foreground">
                  Streamlined application process with direct admission channels
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold">💰</span>
                </div>
                <h4 className="font-semibold text-primary mb-2">Exclusive Scholarships</h4>
                <p className="text-sm text-muted-foreground">
                  Access to partner-specific scholarship opportunities
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold">⚡</span>
                </div>
                <h4 className="font-semibold text-primary mb-2">Faster Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Expedited application review and decision timelines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;