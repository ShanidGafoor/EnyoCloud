import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cloud, Zap, Shield, Users, Mail, Phone, MapPin, ChevronRight, Menu, X, Check, Bot, Globe, BarChart, Smartphone, FileText, Workflow } from 'lucide-react';
import './App.css';

const EnyoCloudWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert('Thank you! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="navbar"
      >
        <div className="nav-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="logo"
          >
            EnyoCloud
          </motion.div>

          <div className="nav-links desktop-nav">
            {['What We Do', 'Who We Are', 'Why Us', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="nav-link"
              >
                {item}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            {['What We Do', 'Who We Are', 'Why Us', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="mobile-nav-link"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="gradient-text">Modern Cloud Solutions</span>
              <br />
              <span>Built for Enterprise</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-subtitle"
          >
            Transform your business with cutting-edge cloud solutions, AI automation, and digital innovation. We deliver enterprise-grade technology that drives growth.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="cta-button"
          >
            Get Started
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="scroll-wheel"
          >
            <div className="scroll-dot" />
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="section services-section">
        <div className="curve-bg curve-top"></div>
        <div className="container">
          <SectionTitle>What We Do</SectionTitle>
          <div className="services-grid">
            {[
              {
                icon: Cloud,
                title: 'Microsoft 365 & SharePoint',
                description: 'Enterprise collaboration platforms with custom workflows, security compliance, and seamless integration.'
              },
              {
                icon: Zap,
                title: 'Custom SPFx & React Development',
                description: 'Modern web parts and applications that extend your Microsoft ecosystem with powerful features.'
              },
              {
                icon: Bot,
                title: 'AI & RAG Solutions',
                description: 'Intelligent AI-powered systems with Retrieval-Augmented Generation for smart data processing.'
              },
              {
                icon: Users,
                title: 'Chatbot Development',
                description: 'Conversational AI chatbots that enhance customer engagement and automate support workflows.'
              },
              {
                icon: Workflow,
                title: 'Power Automate & Digital Automation',
                description: 'Streamline operations with intelligent automation workflows that eliminate manual processes.'
              },
              {
                icon: FileText,
                title: 'SharePoint Document Management',
                description: 'Secure DMS solutions with version control, compliance tracking, and intelligent search.'
              },
              {
                icon: Globe,
                title: 'Website & App Development',
                description: 'Responsive websites and mobile applications built with modern frameworks and best practices.'
              },
              {
                icon: Shield,
                title: 'Cloud Architecture',
                description: 'Scalable, secure cloud infrastructure designed for performance, growth, and cost optimization.'
              },
              {
                icon: BarChart,
                title: 'Digital Marketing & SEO',
                description: 'Strategic digital marketing campaigns and SEO optimization to maximize your online presence.'
              }
            ].map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="section about-section">
        <div className="curve-bg curve-bottom-white"></div>
        <div className="container">
          <div className="about-grid">
            <FadeInWhenVisible>
              <div className="stats-container">
                <div className="stats-card">
                  <div className="stats-grid">
                    {[
                      { label: 'Years Experience', value: '10+' },
                      { label: 'Projects Delivered', value: '200+' },
                      { label: 'Enterprise Clients', value: '50+' },
                      { label: 'Satisfaction Rate', value: '99%' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="stat-item"
                      >
                        <div className="stat-value gradient-text">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="about-content">
                <h2 className="section-subtitle">Your Trusted Technology Partner</h2>
                <p className="text-content">
                  EnyoCloud delivers enterprise-grade technology solutions that empower organizations to thrive in the digital age. We combine deep Microsoft ecosystem expertise with cutting-edge AI, automation, and cloud technologies.
                </p>
                <p className="text-content">
                  From SharePoint solutions to AI-powered chatbots, from digital marketing to custom application development—we're your end-to-end technology partner for digital transformation.
                </p>
                <div className="badges">
                  {['Microsoft Certified', 'Enterprise-Grade', 'AI-Ready', 'Full-Stack Solutions'].map((badge, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="badge"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Why EnyoCloud Section */}
      <section id="why-us" className="section why-section">
        <div className="curve-bg curve-top-white"></div>
        <div className="container">
          <SectionTitle>Why EnyoCloud</SectionTitle>
          <div className="why-grid">
            {[
              {
                title: 'Deep Microsoft & AI Expertise',
                description: 'Certified professionals with extensive experience in Microsoft 365, SharePoint, Power Platform, and AI technologies.',
                points: ['Microsoft certified team', 'AI/ML specialists', 'Best practice implementation']
              },
              {
                title: 'End-to-End Solutions',
                description: 'From cloud infrastructure to digital marketing, from automation to custom development—comprehensive services under one roof.',
                points: ['Full-stack capabilities', 'Integrated approach', 'Unified support']
              },
              {
                title: 'Enterprise Security & Compliance',
                description: 'Security-first approach with compliance built into every solution, meeting the strictest enterprise requirements.',
                points: ['Data protection', 'Compliance ready', 'Security audits']
              },
              {
                title: 'Innovation-Driven Partnership',
                description: 'We stay ahead of technology trends, bringing you AI, automation, and digital innovation that gives you competitive advantage.',
                points: ['Cutting-edge tech', 'Continuous innovation', 'Future-proof solutions']
              }
            ].map((reason, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="why-card"
                >
                  <h3 className="card-title">{reason.title}</h3>
                  <p className="card-description">{reason.description}</p>
                  <ul className="check-list">
                    {reason.points.map((point, j) => (
                      <li key={j}>
                        <Check size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Our Customers Section */}
      <section className="section customers-section">
        <div className="container">
          <SectionTitle className="white-text">Who We Serve</SectionTitle>
          <p className="section-description white-text">
            From growing startups to Fortune 500 enterprises, we help organizations across industries achieve digital excellence.
          </p>
          <div className="customers-grid">
            {[
              {
                title: 'Enterprise Organizations',
                description: 'Large-scale deployments with complex requirements, multi-department workflows, and enterprise security needs.',
                industries: ['Finance', 'Healthcare', 'Manufacturing', 'Technology']
              },
              {
                title: 'Growing Companies',
                description: 'Scaling businesses that need robust, flexible infrastructure and modern digital solutions.',
                industries: ['SaaS', 'E-commerce', 'Professional Services', 'Startups']
              },
              {
                title: 'Government & Education',
                description: 'Public sector and educational institutions requiring compliance, accessibility, and secure platforms.',
                industries: ['Government', 'Higher Education', 'K-12', 'Non-profit']
              }
            ].map((segment, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="customer-card"
                >
                  <h3>{segment.title}</h3>
                  <p>{segment.description}</p>
                  <div className="industry-tags">
                    {segment.industries.map((industry, j) => (
                      <span key={j}>{industry}</span>
                    ))}
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="curve-bg curve-bottom-dark"></div>
        <div className="container">
          <SectionTitle className="white-text">Let's Build Something Great</SectionTitle>
          <div className="contact-grid">
            <FadeInWhenVisible>
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>
                  Ready to transform your digital operations? Let's discuss how EnyoCloud can help your organization achieve its technology goals.
                </p>

                <div className="contact-items">
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@enyocloud.com' },
                    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                    { icon: MapPin, label: 'Location', value: 'Global Remote Services' }
                  ].map((contact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="contact-item"
                    >
                      <div className="contact-icon">
                        <contact.icon size={20} />
                      </div>
                      <div>
                        <div className="contact-label">{contact.label}</div>
                        <div className="contact-value">{contact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    placeholder="Tell us about your project..."
                  />
                </div>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="submit-button"
                >
                  Send Message
                </motion.button>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">EnyoCloud</div>
            <div className="footer-links">
              {['What We Do', 'Who We Are', 'Why Us', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="footer-link"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} EnyoCloud. All rights reserved. Enterprise IT Solutions & Cloud Consulting.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable Components
const SectionTitle = ({ children, className = '' }) => (
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`section-title ${className}`}
  >
    {children}
  </motion.h2>
);

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <FadeInWhenVisible delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="service-card"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="service-icon"
        >
          <Icon size={28} />
        </motion.div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </motion.div>
    </FadeInWhenVisible>
  );
};

export default EnyoCloudWebsite;