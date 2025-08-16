import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "University Selection", href: "/services" },
      { name: "Admission Support", href: "/services" },
      { name: "Visa Assistance", href: "/services" },
      { name: "Exam Preparation", href: "/services" },
      { name: "Scholarship Guidance", href: "/services" }
    ],
    destinations: [
      { name: "United States", href: "/partners" },
      { name: "United Kingdom", href: "/partners" },
      { name: "Canada", href: "/partners" },
      { name: "Hungary", href: "/partners" },
      { name: "Germany", href: "/partners" },
      // { name: "Netherlands", href: "/partners" }
    ],
    company: [
      { name: "About Us", href: "/" },
      { name: "Success Stories", href: "/testimonials" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/profile.php?id=61553394546555", name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/_eufesglobal?igsh=ODM5bmNxZXVseDcy", name: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-secondary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">EUFES</h3>
                <p className="text-sm text-primary-foreground/80">Study Abroad Consultancy</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed">
              Empowering students to achieve their global education dreams through 
              expert guidance, personalized support, and strategic partnerships worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-sm">info@euforeignedu.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-sm">+234 (0) 802 3145 124</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-secondary" />
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Study Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-medium mb-4">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-primary-foreground/10 hover:bg-secondary text-primary-foreground hover:text-secondary-foreground p-2 rounded-lg transition-all duration-300"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © {currentYear} EUFES (EU Foreign Education Solutions). All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-2 md:mb-0">
              <span className="text-secondary-foreground font-semibold">
                Ready to start your international education journey?
              </span>
            </div>
            <Link to="/contact" className="bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-2 rounded-lg font-medium transition-all duration-300">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;