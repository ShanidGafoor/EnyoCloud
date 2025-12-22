import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Award, Puzzle, ShieldCheck, HeartHandshake } from 'lucide-react';

const differentiators = [
  {
    number: '01',
    icon: Award,
    title: 'Deep Microsoft Expertise',
    description: 'Certified professionals with years of hands-on experience in the Microsoft ecosystem.',
    features: ['Microsoft 365 Certified', 'Azure Solutions Architects', 'Power Platform Specialists'],
  },
  {
    number: '02',
    icon: Puzzle,
    title: 'Tailored Solutions',
    description: 'No cookie-cutter approaches. Every solution is designed specifically for your needs.',
    features: ['Custom Development', 'Flexible Architecture', 'Scalable Designs'],
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Security-first mindset with industry-leading practices and compliance standards.',
    features: ['Data Protection', 'Compliance Ready', 'Zero Trust Architecture'],
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Long-term Partnership',
    description: 'We are invested in your success with ongoing support and continuous optimization.',
    features: ['Dedicated Support', 'Continuous Improvement', 'Knowledge Transfer'],
  },
];

export const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Our Differentiators
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose EnyoCloud
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine technical excellence with a genuine commitment to your success
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative card-premium h-full group"
              >
                {/* Number badge */}
                <motion.span
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.number}
                </motion.span>

                <div className="flex items-start gap-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                  >
                    <item.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature) => (
                        <span key={feature} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
