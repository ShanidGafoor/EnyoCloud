import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Users2, Briefcase, Calculator, FileCheck, Settings } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'Enterprise',
    description: 'Large organizations modernizing their digital infrastructure',
  },
  {
    icon: Users2,
    name: 'Human Resources',
    description: 'HR departments streamlining people operations',
  },
  {
    icon: Calculator,
    name: 'Finance',
    description: 'Finance teams automating workflows and reporting',
  },
  {
    icon: Settings,
    name: 'Operations',
    description: 'Operations groups optimizing business processes',
  },
  {
    icon: Briefcase,
    name: 'Administration',
    description: 'Administrative teams improving document management',
  },
  {
    icon: FileCheck,
    name: 'Compliance',
    description: 'Compliance officers ensuring regulatory adherence',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '5+', label: 'Years Experience' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const CustomersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="customers" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

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
              Who We Serve
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our Customers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From growing startups to established enterprises, we empower organizations across industries
            </p>
          </motion.div>

          {/* Industries Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {industries.map((industry) => (
              <motion.div
                key={industry.name}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <industry.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl bg-card border border-border"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomersSection;
