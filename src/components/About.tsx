import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Target, Handshake, Lightbulb, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Every solution we build is aligned with your strategic goals and business outcomes.',
  },
  {
    icon: Handshake,
    title: 'Partnership Approach',
    description: 'We work alongside your team, not just for you, building lasting relationships.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Focus',
    description: 'Constantly exploring new technologies to keep your business ahead of the curve.',
  },
  {
    icon: TrendingUp,
    title: 'Results Obsessed',
    description: 'Measurable impact and tangible ROI are at the core of everything we deliver.',
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <AnimatedSection direction="left">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Your Trusted Technology Partner
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1} direction="left">
              <p className="text-muted-foreground leading-relaxed mb-6">
                EnyoCloud was founded with a clear mission: to help organizations harness the full potential of modern cloud technologies without the complexity and risk.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} direction="left">
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are a team of certified Microsoft specialists, architects, and developers who have spent years solving complex enterprise challenges. Our deep expertise in the Microsoft ecosystem, combined with our commitment to tailored solutions, makes us the ideal partner for organizations ready to transform.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} direction="left">
              <p className="text-muted-foreground leading-relaxed">
                From startups scaling their operations to enterprises modernizing legacy systems, we bring the same dedication: understanding your unique needs and delivering solutions that truly work.
              </p>
            </AnimatedSection>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <value.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
