import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Award, Shield, Cog, HeartHandshake, CheckCircle } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Deep Microsoft Expertise',
    description: 'Certified professionals with years of hands-on experience in the Microsoft ecosystem.',
    highlights: [
      'Microsoft 365 Certified',
      'Azure Solutions Architects',
      'Power Platform Specialists',
    ],
  },
  {
    icon: Cog,
    title: 'Tailored Solutions',
    description: 'No cookie-cutter approaches. Every solution is designed specifically for your needs.',
    highlights: [
      'Custom Development',
      'Flexible Architecture',
      'Scalable Designs',
    ],
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Security-first mindset with industry-leading practices and compliance standards.',
    highlights: [
      'Data Protection',
      'Compliance Ready',
      'Zero Trust Architecture',
    ],
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Partnership',
    description: 'We are invested in your success with ongoing support and continuous optimization.',
    highlights: [
      'Dedicated Support',
      'Continuous Improvement',
      'Knowledge Transfer',
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Our Differentiators
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose EnyoCloud
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine technical excellence with a genuine commitment to your success
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="p-8 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all duration-500 hover:shadow-xl h-full">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
                      <reason.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3 pl-[4.5rem]">
                    {reason.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-bold text-accent">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
