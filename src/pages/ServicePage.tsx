import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ThreeScene, ScrollThreeElement } from '../components/ThreeScene';
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: { title: string; description: string }[];
  technologies: string[];
  category: string;
  threeVariant: 'sharepoint' | 'webdev' | 'marketing' | 'apps';
}

const servicesData: Record<string, ServiceData> = {
  'sharepoint-intranet': {
    title: 'SharePoint Intranet Solutions',
    subtitle: 'Modern intranet portals, communication sites, and custom SPFx components',
    description: 'Transform your workplace with modern SharePoint intranet solutions. We design and develop beautiful, functional intranets that connect your teams and streamline communication.',
    category: 'SharePoint & Digital Workplace',
    threeVariant: 'sharepoint',
    features: [
      'Custom SharePoint Online sites',
      'Modern communication portals',
      'SPFx web parts & extensions',
      'Teams integration',
      'Document management',
      'News & announcements'
    ],
    benefits: [
      { title: 'Enhanced Collaboration', description: 'Connect teams across departments with centralized communication hubs' },
      { title: 'Improved Productivity', description: 'Streamline workflows and reduce time spent searching for information' },
      { title: 'Modern User Experience', description: 'Beautiful, responsive designs that employees love to use' }
    ],
    technologies: ['SharePoint Online', 'SPFx', 'React', 'Microsoft Graph', 'Power Automate']
  },
  'sharepoint-business-apps': {
    title: 'SharePoint Business Applications',
    subtitle: 'Purchase Order systems, CRM, workflows, and approval solutions',
    description: 'Build powerful business applications on SharePoint that automate processes, track data, and improve operational efficiency across your organization.',
    category: 'SharePoint & Digital Workplace',
    threeVariant: 'sharepoint',
    features: [
      'Purchase order management',
      'Custom CRM solutions',
      'Approval workflows',
      'Inventory tracking',
      'Budget management',
      'Reporting dashboards'
    ],
    benefits: [
      { title: 'Process Automation', description: 'Eliminate manual tasks with automated workflows and approvals' },
      { title: 'Data Visibility', description: 'Real-time dashboards and reports for informed decision making' },
      { title: 'Cost Savings', description: 'Reduce operational costs by streamlining business processes' }
    ],
    technologies: ['SharePoint Lists', 'Power Automate', 'Power Apps', 'Power BI', 'Azure Functions']
  },
  'task-planner': {
    title: 'Task & Planner Enhancements',
    subtitle: 'Advanced task tracking and dashboards using SharePoint + Planner',
    description: 'Supercharge your task management with custom solutions that extend Microsoft Planner and integrate seamlessly with SharePoint for comprehensive project tracking.',
    category: 'SharePoint & Digital Workplace',
    threeVariant: 'sharepoint',
    features: [
      'Custom task dashboards',
      'Planner extensions',
      'Project tracking',
      'Resource allocation',
      'Timeline views',
      'Reporting & analytics'
    ],
    benefits: [
      { title: 'Complete Visibility', description: 'See all tasks and projects in one unified dashboard' },
      { title: 'Better Planning', description: 'Allocate resources effectively with advanced planning tools' },
      { title: 'Team Accountability', description: 'Track progress and ensure timely delivery of projects' }
    ],
    technologies: ['Microsoft Planner', 'SharePoint', 'Power BI', 'Microsoft Graph', 'Teams']
  },
  'web-applications': {
    title: 'Standalone Web Applications',
    subtitle: 'Custom web apps built with React and modern backend architectures',
    description: 'We build custom web applications from the ground up using modern technologies. From SaaS platforms to enterprise tools, we deliver scalable, maintainable solutions.',
    category: 'Application Development',
    threeVariant: 'webdev',
    features: [
      'React/Next.js frontends',
      'Node.js/Python backends',
      'Cloud-native architecture',
      'API development',
      'Database design',
      'CI/CD pipelines'
    ],
    benefits: [
      { title: 'Scalability', description: 'Applications built to grow with your business needs' },
      { title: 'Performance', description: 'Optimized for speed and reliability' },
      { title: 'Maintainability', description: 'Clean code architecture for easy updates and extensions' }
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS/Azure', 'Docker']
  },
  'microsoft-apps': {
    title: 'Microsoft App Development',
    subtitle: 'Business apps built using Microsoft 365, Azure, and integrations',
    description: 'Leverage the full power of the Microsoft ecosystem with custom applications that integrate seamlessly with Microsoft 365, Azure, and other Microsoft services.',
    category: 'Application Development',
    threeVariant: 'apps',
    features: [
      'Microsoft 365 integrations',
      'Azure cloud services',
      'Teams applications',
      'Outlook add-ins',
      'Microsoft Graph APIs',
      'Azure Active Directory'
    ],
    benefits: [
      { title: 'Seamless Integration', description: 'Works naturally with tools your team already uses' },
      { title: 'Enterprise Security', description: 'Built on Microsoft\'s enterprise security infrastructure' },
      { title: 'Unified Experience', description: 'Consistent user experience across the Microsoft ecosystem' }
    ],
    technologies: ['Microsoft 365', 'Azure', 'Microsoft Graph', 'Teams SDK', 'Azure AD']
  },
  'power-apps': {
    title: 'Power Apps Development',
    subtitle: 'Low-code apps with Power Apps, Dataverse, and Power Automate',
    description: 'Rapidly build business applications using Microsoft Power Platform. We create efficient, scalable solutions that connect to your data and automate workflows.',
    category: 'Application Development',
    threeVariant: 'apps',
    features: [
      'Canvas & model-driven apps',
      'Dataverse integration',
      'Power Automate flows',
      'Custom connectors',
      'Portal development',
      'AI Builder integration'
    ],
    benefits: [
      { title: 'Rapid Development', description: 'Build and deploy apps faster with low-code platform' },
      { title: 'Business Empowerment', description: 'Enable citizen developers to create their own solutions' },
      { title: 'Deep Integration', description: 'Connect to hundreds of data sources and services' }
    ],
    technologies: ['Power Apps', 'Dataverse', 'Power Automate', 'Power BI', 'AI Builder']
  },
  'business-websites': {
    title: 'Business Websites',
    subtitle: 'Fast, modern, and responsive websites for companies and startups',
    description: 'Create stunning, high-performance websites that represent your brand and convert visitors into customers. From corporate sites to startup landing pages.',
    category: 'Website Development',
    threeVariant: 'webdev',
    features: [
      'Responsive design',
      'SEO optimization',
      'Performance tuning',
      'CMS integration',
      'Analytics setup',
      'Hosting & maintenance'
    ],
    benefits: [
      { title: 'Professional Image', description: 'Establish credibility with a polished online presence' },
      { title: 'Lead Generation', description: 'Convert visitors into qualified leads and customers' },
      { title: 'Brand Consistency', description: 'Reflect your brand identity across all touchpoints' }
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'Vercel/Netlify']
  },
  'landing-pages': {
    title: 'Product & Landing Pages',
    subtitle: 'Conversion-focused pages for marketing and campaigns',
    description: 'High-converting landing pages designed to maximize your marketing ROI. We combine compelling design with data-driven optimization techniques.',
    category: 'Website Development',
    threeVariant: 'webdev',
    features: [
      'Conversion optimization',
      'A/B testing ready',
      'Fast load times',
      'Mobile-first design',
      'Form integrations',
      'Analytics tracking'
    ],
    benefits: [
      { title: 'Higher Conversions', description: 'Pages designed with conversion best practices' },
      { title: 'Faster Campaigns', description: 'Quick turnaround for marketing initiatives' },
      { title: 'Measurable Results', description: 'Built-in analytics for data-driven decisions' }
    ],
    technologies: ['React', 'Next.js', 'Framer Motion', 'Analytics', 'CRM Integration']
  },
  'seo-performance': {
    title: 'SEO & Performance Optimization',
    subtitle: 'Improve search visibility and website performance',
    description: 'Boost your online visibility and website performance with comprehensive SEO strategies and technical optimizations that drive organic traffic.',
    category: 'Digital Marketing',
    threeVariant: 'marketing',
    features: [
      'Technical SEO audit',
      'On-page optimization',
      'Performance tuning',
      'Core Web Vitals',
      'Content strategy',
      'Backlink analysis'
    ],
    benefits: [
      { title: 'Increased Visibility', description: 'Rank higher in search results for relevant keywords' },
      { title: 'Better User Experience', description: 'Faster, more responsive websites for visitors' },
      { title: 'Sustainable Growth', description: 'Long-term organic traffic growth strategy' }
    ],
    technologies: ['Google Search Console', 'Analytics', 'Lighthouse', 'Ahrefs', 'Schema.org']
  },
  'social-media': {
    title: 'Social Media & Content Marketing',
    subtitle: 'Brand awareness and lead generation campaigns',
    description: 'Build your brand presence and generate leads through strategic social media marketing and compelling content that resonates with your audience.',
    category: 'Digital Marketing',
    threeVariant: 'marketing',
    features: [
      'Social media strategy',
      'Content creation',
      'Community management',
      'Paid advertising',
      'Influencer outreach',
      'Performance reporting'
    ],
    benefits: [
      { title: 'Brand Awareness', description: 'Increase visibility and recognition in your market' },
      { title: 'Engaged Community', description: 'Build a loyal following of brand advocates' },
      { title: 'Quality Leads', description: 'Generate leads through targeted campaigns' }
    ],
    technologies: ['Meta Business Suite', 'LinkedIn', 'Buffer/Hootsuite', 'Canva', 'Analytics']
  }
};

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <ThreeScene variant={service.threeVariant} />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />
        
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-semibold mb-4 block tracking-wide"
            >
              {service.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="section-title mb-6 text-foreground"
            >
              {service.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-foreground/70 mb-10 leading-relaxed"
            >
              {service.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/contact" className="btn-primary inline-flex items-center gap-3 text-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Element Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <ScrollThreeElement type="gear" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Key Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Benefits</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="service-card"
              >
                <h3 className="text-xl font-display font-semibold mb-3 text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Technologies We Use</h2>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {service.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium"
              >
                {tech}
              </motion.span>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} can help transform your business.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3 text-lg">
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
