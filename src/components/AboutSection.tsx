import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Lightbulb, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Every solution we build is aligned with your strategic goals and business outcomes.',
  },
  {
    icon: Users,
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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Your Trusted Technology Partner
              </h2>
              <div className="space-y-4 text-primary-foreground/80">
                <p className="text-lg leading-relaxed">
                  EnyoCloud was founded with a clear mission: to help organizations harness the full 
                  potential of modern cloud technologies without the complexity and risk.
                </p>
                <p className="leading-relaxed">
                  We are a team of certified Microsoft specialists, architects, and developers who 
                  have spent years solving complex enterprise challenges. Our deep expertise in the 
                  Microsoft ecosystem, combined with our commitment to tailored solutions, makes us 
                  the ideal partner for organizations ready to transform.
                </p>
                <p className="leading-relaxed">
                  From startups scaling their operations to enterprises modernizing legacy systems, 
                  we bring the same dedication: understanding your unique needs and delivering 
                  solutions that truly work.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Values */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
