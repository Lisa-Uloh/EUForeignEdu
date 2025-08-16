import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'consultation', label: 'Free Consultation' },
    { value: 'application', label: 'Application Support' },
    { value: 'visa', label: 'Visa Assistance' },
    { value: 'exam-prep', label: 'Exam Preparation' },
    { value: 'scholarship', label: 'Scholarship Information' }
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "info@euforeignedu.com",
      subtext: "Response within 2 hours"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+234 (0) 802 3145 124",
      subtext: "Mon-Fri 8AM-6PM WAT"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Office",
      details: "Lagos, Nigeria",
      subtext: "By appointment only"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Support",
      details: "24/7 Available",
      subtext: "Emergency consultation"
    }
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Honeypot: if filled, likely a bot
  const hp = (document.getElementById("company") as HTMLInputElement | null)?.value;
  if (hp && hp.trim().length > 0) return;

  setIsSubmitting(true);

  try {
    await addDoc(collection(db, "leads"), {
      fullName: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      subject: formData.subject,            // "general", "consultation", etc.
      message: formData.message.trim(),
      source: window.location.href,         // where the user submitted from
      createdAt: serverTimestamp(),         // server time
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after a short delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      });
    }, 2500);
  } catch (err: any) {
    setIsSubmitting(false);
    setErrors((prev) => ({
      ...prev,
      submit: err?.message || "Submission failed. Please try again.",
    }));
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="section-title fade-in-up">Get in Touch</h2>
            <p className="section-subtitle fade-in-up">
              Ready to start your international education journey? Contact our expert counselors 
              for personalized guidance and support. Your future begins with a conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 fade-in-up">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you're just starting to explore your options or ready to begin your application, 
                  we're here to help. Our experienced counselors provide personalized guidance tailored to your unique goals.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg shadow-soft stagger-animation"
                    style={{ '--stagger-delay': `${index * 150}ms` } as React.CSSProperties}
                  >
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                      <p className="text-foreground font-medium">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-card border border-border rounded-lg p-6 text-center shadow-soft">
                <div className="bg-muted/50 rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Lagos Office Location</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Visit our office for in-person consultation by appointment
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in-up">
              <div className="bg-card border border-border rounded-xl p-8 shadow-medium">
                <h3 className="text-xl font-bold text-primary mb-6">Send us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-success mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input id="company" name="company" autoComplete="off" tabIndex={-1} style={{ display: "none" }} />

                    {/* Name */}
                    {errors.submit && <p className="text-destructive text-sm mt-2">{errors.submit}</p>}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-destructive' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? 'border-destructive' : ''}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {subjects.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-textarea ${errors.message ? 'border-destructive' : ''}`}
                        placeholder="Tell us about your educational goals and how we can help..."
                        rows={4}
                      />
                      {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-medium'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;