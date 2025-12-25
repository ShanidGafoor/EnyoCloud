import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ThreeScene } from '@/components/ThreeScene';
import { Calendar, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    category: 'Microsoft Updates',
    title: 'Microsoft Copilot: Revolutionizing Productivity in 2024',
    excerpt: 'Explore how Microsoft Copilot is transforming the way businesses work with AI-powered assistance across Microsoft 365 applications.',
    date: 'Dec 20, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    tags: ['AI', 'Microsoft 365', 'Productivity']
  },
  {
    id: 2,
    category: 'Web Development',
    title: 'Next.js 15: What Developers Need to Know',
    excerpt: 'A deep dive into the latest features and improvements in Next.js 15, including enhanced performance and new React 19 support.',
    date: 'Dec 18, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    tags: ['React', 'Next.js', 'Frontend']
  },
  {
    id: 3,
    category: 'AI & Automation',
    title: 'Building Intelligent Workflows with Power Automate and AI',
    excerpt: 'Learn how to create smart automation workflows that leverage AI capabilities to streamline business processes.',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['Power Automate', 'AI', 'Automation']
  },
  {
    id: 4,
    category: 'Microsoft Updates',
    title: 'SharePoint Premium: Advanced Document Management Features',
    excerpt: 'Discover the new SharePoint Premium features that enhance document management, content processing, and collaboration.',
    date: 'Dec 12, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['SharePoint', 'Microsoft 365', 'Enterprise']
  },
  {
    id: 5,
    category: 'Web Development',
    title: 'The Rise of Edge Computing in Modern Web Apps',
    excerpt: 'How edge computing is changing the landscape of web application development and improving user experiences globally.',
    date: 'Dec 10, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    tags: ['Edge Computing', 'Performance', 'Cloud']
  },
  {
    id: 6,
    category: 'AI & Automation',
    title: 'GPT-4 Turbo: Implications for Enterprise Development',
    excerpt: 'Understanding how GPT-4 Turbo capabilities can be integrated into enterprise applications for enhanced productivity.',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    tags: ['OpenAI', 'Enterprise AI', 'Development']
  },
  {
    id: 7,
    category: 'Microsoft Updates',
    title: 'Teams 2.0: Performance Improvements and New Features',
    excerpt: 'Microsoft Teams gets a major overhaul with improved performance, new collaboration tools, and enhanced meeting experiences.',
    date: 'Dec 5, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    tags: ['Microsoft Teams', 'Collaboration', 'Communication']
  },
  {
    id: 8,
    category: 'Web Development',
    title: 'Server Components: The Future of React Development',
    excerpt: 'A comprehensive guide to React Server Components and how they are reshaping modern web development practices.',
    date: 'Dec 3, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React', 'Server Components', 'Architecture']
  },
  {
    id: 9,
    category: 'AI & Automation',
    title: 'Azure AI Services: Building Intelligent Applications',
    excerpt: 'Explore Azure AI services and learn how to integrate cognitive capabilities into your business applications.',
    date: 'Dec 1, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    tags: ['Azure', 'AI Services', 'Cloud']
  }
];

const categories = ['All', 'Microsoft Updates', 'Web Development', 'AI & Automation'];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ThreeScene variant="blogs" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6"
            >
              Insights & Updates
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Latest <span className="text-primary">Blogs</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest in Microsoft development, web technologies, 
              and AI innovations shaping the future of enterprise solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card/50 text-foreground/70 hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="group"
              >
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-foreground/70 text-sm mb-4 flex-1 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 text-xs text-foreground/70"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link 
                      to="#"
                      className="inline-flex items-center gap-2 text-primary font-medium group/link"
                    >
                      Read More 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* No results message */}
          {filteredBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">No blogs found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
              Get the latest insights on Microsoft development, AI innovations, and web 
              technologies delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:outline-none transition-colors"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
