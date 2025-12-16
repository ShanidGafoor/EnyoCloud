import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { 
  Cloud, 
  Code2, 
  Workflow, 
  FolderKanban, 
  Server,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: 'Microsoft 365 & SharePoint',
    description: 'Complete implementation and optimization of Microsoft 365 ecosystem, including SharePoint Online, Teams integration, and collaborative workspaces.',
    features: ['SharePoint Online', 'Teams Integration', 'Power Platform'],
  },
  {
    icon: Code2,
    title: 'Custom Web & SPFx Development',
    description: 'Tailored SharePoint Framework solutions and modern React applications designed to extend your Microsoft investment.',
    features: ['SPFx Web Parts', 'React Applications', 'API Integrations'],
  },
  {
    icon: Workflow,
    title: 'Automation & Workflows',
    description: 'Streamline business processes with Power Automate, reducing manual tasks and improving operational efficiency across departments.',
    features: ['Power Automate', 'Business Logic', 'Process Optimization'],
  },
  {
    icon: FolderKanban,
    title: 'Document Management',
    description: 'Enterprise-grade document management systems that ensure compliance, enable collaboration, and protect critical business information.',
    features: ['DMS Solutions', 'Compliance', 'Version Control'],
  },
  {
    icon: Server,
    title: 'Cloud & AI Architecture',
    description: 'Future-ready infrastructure design that prepares your organization for AI integration and scalable cloud operations.',
    features: ['Azure Solutions', 'AI Integration', 'Scalable Design'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
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
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive cloud and enterprise solutions tailored to transform your business operations
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
