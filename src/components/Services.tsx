import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Cloud, Code, Workflow, FileText, Brain } from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: 'Microsoft 365 & SharePoint',
    description: 'Complete implementation and optimization of Microsoft 365 ecosystem, including SharePoint Online, Teams integration, and collaborative workspaces.',
    tags: ['SharePoint Online', 'Teams Integration', 'Power Platform'],
  },
  {
    icon: Code,
    title: 'Custom Web & SPFx Development',
    description: 'Tailored SharePoint Framework solutions and modern React applications designed to extend your Microsoft investment.',
    tags: ['SPFx Web Parts', 'React Applications', 'API Integrations'],
  },
  {
    icon: Workflow,
    title: 'Automation & Workflows',
    description: 'Streamline business processes with Power Automate, reducing manual tasks and improving operational efficiency across departments.',
    tags: ['Power Automate', 'Business Logic', 'Process Optimization'],
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Enterprise-grade document management systems that ensure compliance, enable collaboration, and protect critical business information.',
    tags: ['DMS Solutions', 'Compliance', 'Version Control'],
  },
  {
    icon: Brain,
    title: 'Cloud & AI Architecture',
    description: 'Future-ready infrastructure design that prepares your organization for AI integration and scalable cloud operations.',
    tags: ['Azure Solutions', 'AI Integration', 'Scalable Design'],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cloud and enterprise solutions tailored to transform your business operations
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="feature-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
