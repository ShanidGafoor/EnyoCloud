import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThreeScene } from '../components/ThreeScene';
import { Layout } from '../components/Layout';
import { 
  Server, Code, Globe, TrendingUp, ArrowRight, 
  CheckCircle, Zap, Shield, Cloud, Users
} from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'SharePoint & Digital Workplace',
    description: 'Modern intranet portals, business applications, and task management solutions built on Microsoft SharePoint.',
    link: '/services/sharepoint-intranet',
    features: ['Intranet Solutions', 'Business Apps', 'Task Tracking']
  },
  {
    icon: Code,
    title: 'Application Development',
    description: 'Custom web applications, Microsoft integrations, and Power Apps development for enterprise needs.',
    link: '/services/web-applications',
    features: ['Web Apps', 'Microsoft 365', 'Power Platform']
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Fast, modern, and responsive websites optimized for user experience and conversions.',
    link: '/services/business-websites',
    features: ['Business Sites', 'Landing Pages', 'E-commerce']
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive SEO optimization, social media marketing, and content strategies that drive results.',
    link: '/services/seo-performance',
    features: ['SEO', 'Social Media', 'Content Marketing']
  }
];

const features = [
  { icon: Cloud, title: 'Cloud-Native', description: 'Built for modern cloud infrastructure' },
  { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade security protocols' },
  { icon: Zap, title: 'AI-Ready', description: 'Prepared for AI integration' },
  { icon: Users, title: '24/7 Support', description: 'Round-the-clock assistance' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene variant="hero" />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background z-[1]" />
        
        <div className="relative z-10 container mx-auto px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-medium tracking-wide">Enterprise Cloud Solutions</span>
            </motion.div>

            <h1 className="section-title mb-8 text-foreground">
              Transform Your Business with{' '}
              <span className="gradient-text glow-text block mt-2">Intelligent Cloud</span>
              <span className="block mt-2">Solutions</span>
            </h1>

            <p className="section-subtitle mx-auto mb-12 text-foreground/80">
              We specialize in Microsoft 365, SharePoint, and custom enterprise applications. 
              Secure, scalable, and AI-ready solutions designed for modern organizations.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-3 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services/sharepoint-intranet" className="btn-outline inline-flex items-center justify-center gap-3 text-lg">
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-card px-6 py-3.5 flex items-center gap-3"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/90">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-sm text-muted-foreground font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-7 h-12 rounded-full border-2 border-primary/40 flex items-start justify-center p-2"
            >
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full bg-primary" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-20"
          >
            <motion.span variants={itemVariants} className="text-primary font-semibold mb-4 block tracking-wide">
              Our Expertise
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title mb-6 text-foreground">
              What We Do
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle mx-auto text-foreground/70">
              Comprehensive cloud and enterprise solutions tailored to transform your business operations
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Link to={service.link} className="service-card block h-full group">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-foreground/70 mb-5 leading-relaxed">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/80 text-foreground/80"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative bg-card/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="text-primary font-semibold mb-4 block tracking-wide">Who We Are</span>
              <h2 className="section-title mb-8 text-foreground">
                Your Trusted Technology Partner
              </h2>
              <p className="text-foreground/70 text-lg mb-10 leading-relaxed">
                With years of experience in Microsoft technologies and custom development, 
                we help organizations leverage the full potential of cloud computing and 
                modern enterprise solutions to drive growth and efficiency.
              </p>
              
              <div className="space-y-5">
                {[
                  'Microsoft 365 & SharePoint Experts',
                  'Custom Development Solutions',
                  'Enterprise-Grade Security',
                  'AI & Automation Ready'
                ].map((item) => (
                  <motion.div 
                    key={item} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-1 rounded-full bg-primary/20">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground/90">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/about" className="btn-primary inline-flex items-center gap-3 mt-10">
                Learn About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: '100+', label: 'Projects Delivered' },
                { number: '50+', label: 'Enterprise Clients' },
                { number: '10+', label: 'Years Experience' },
                { number: '99%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="glass-card p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-3">{stat.number}</div>
                  <div className="text-foreground/60 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 md:p-20 text-center glow-border"
          >
            <h2 className="section-title mb-8 text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="section-subtitle mx-auto mb-12 text-foreground/70">
              Let's discuss how we can help you leverage cloud technology to achieve your goals 
              and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-3 text-lg">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services/sharepoint-intranet" className="btn-outline inline-flex items-center justify-center gap-3 text-lg">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
