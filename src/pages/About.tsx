import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ThreeScene, ScrollThreeElement } from '../components/ThreeScene';
import { CheckCircle, ArrowRight, Users, Target, Award, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable outcomes that directly impact your business success.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of technology trends to bring cutting-edge solutions to our clients.'
  },
  {
    icon: Users,
    title: 'Partnership Approach',
    description: 'We work as an extension of your team, understanding your unique challenges and goals.'
  },
  {
    icon: Award,
    title: 'Excellence in Execution',
    description: 'We deliver high-quality solutions on time and within budget, every time.'
  }
];

const expertise = [
  'Microsoft 365 & SharePoint',
  'Custom Web Development',
  'Power Platform Solutions',
  'Cloud Architecture (Azure)',
  'API Development & Integration',
  'Enterprise Security',
  'AI & Automation',
  'Digital Marketing'
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <ThreeScene variant="about" />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />
        
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <span className="text-primary font-semibold mb-4 block tracking-wide">About Us</span>
            <h1 className="section-title mb-8 text-foreground">
              Your Trusted <span className="gradient-text glow-text">Technology Partner</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl">
              We help organizations leverage the full potential of cloud computing and 
              modern enterprise solutions to transform their operations and achieve growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with 3D element */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a mission to democratize enterprise technology, EnyoCloud has grown 
                  from a small consultancy into a trusted partner for businesses worldwide.
                </p>
                <p>
                  Our team of certified experts brings decades of combined experience in Microsoft 
                  technologies, custom development, and digital transformation. We've helped 
                  organizations of all sizes—from startups to Fortune 500 companies—achieve 
                  their technology goals.
                </p>
                <p>
                  We believe that powerful technology should be accessible to every organization, 
                  and we're committed to delivering solutions that are both sophisticated and practical.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: '100+', label: 'Projects Delivered' },
                { number: '50+', label: 'Enterprise Clients' },
                { number: '10+', label: 'Years Experience' },
                { number: '99%', label: 'Client Satisfaction' }
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-8 text-center">
                  <div className="text-4xl font-display font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Element Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <ScrollThreeElement type="network" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="service-card text-center"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Expertise</h2>
              <p className="text-muted-foreground mb-8">
                We bring deep expertise across a wide range of technologies and platforms, 
                enabling us to deliver comprehensive solutions for any challenge.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-display font-semibold mb-4">Certifications</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <span className="font-medium">Microsoft Gold Partner</span>
                  <p className="text-sm text-muted-foreground mt-1">Cloud Platform & Modern Workplace</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <span className="font-medium">Azure Solutions Architect</span>
                  <p className="text-sm text-muted-foreground mt-1">Expert Level Certification</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <span className="font-medium">Power Platform Developer</span>
                  <p className="text-sm text-muted-foreground mt-1">Associate Level Certification</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 text-center glow-border"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to transform your business with intelligent cloud solutions? 
              We'd love to hear from you.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
