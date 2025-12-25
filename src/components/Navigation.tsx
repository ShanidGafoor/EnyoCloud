import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const services = [
  {
    category: 'SharePoint & Digital Workplace',
    items: [
      { name: 'SharePoint Intranet Solutions', path: '/services/sharepoint-intranet', description: 'Modern intranet portals & SPFx components' },
      { name: 'SharePoint Business Applications', path: '/services/sharepoint-business-apps', description: 'Purchase Order, CRM & workflow solutions' },
      { name: 'Task & Planner Enhancements', path: '/services/task-planner', description: 'Advanced task tracking & dashboards' },
    ]
  },
  {
    category: 'Application Development',
    items: [
      { name: 'Standalone Web Applications', path: '/services/web-applications', description: 'Custom React & modern backend apps' },
      { name: 'Microsoft App Development', path: '/services/microsoft-apps', description: 'Microsoft 365 & Azure integrations' },
      { name: 'Power Apps Development', path: '/services/power-apps', description: 'Low-code apps with Power Platform' },
    ]
  },
  {
    category: 'Website Development',
    items: [
      { name: 'Business Websites', path: '/services/business-websites', description: 'Fast, modern & responsive websites' },
      { name: 'Product & Landing Pages', path: '/services/landing-pages', description: 'Conversion-focused marketing pages' },
    ]
  },
  {
    category: 'Digital Marketing',
    items: [
      { name: 'SEO & Performance', path: '/services/seo-performance', description: 'Search visibility & optimization' },
      { name: 'Social Media & Content', path: '/services/social-media', description: 'Brand awareness campaigns' },
    ]
  }
];

export function Navigation() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              Enyo<span className="text-primary">Cloud</span>.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="nav-link py-2">Home</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="nav-link flex items-center gap-1 py-2">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[800px]"
                  >
                    <div className="glass-card p-6 grid grid-cols-2 gap-6">
                      {services.map((category) => (
                        <div key={category.category}>
                          <h4 className="text-primary font-semibold text-sm mb-3">{category.category}</h4>
                          <div className="space-y-2">
                            {category.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="block p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                              >
                                <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                                  {item.name}
                                </span>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blogs" className="nav-link py-2">Blogs</Link>
            <Link to="/about" className="nav-link py-2">About</Link>
            <Link to="/contact" className="nav-link py-2">Contact</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                <Link to="/" className="block py-3 text-foreground font-medium">Home</Link>
                <div>
                  <button 
                    className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    Services
                    <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-4 mt-2"
                      >
                        {services.map((category) => (
                          <div key={category.category}>
                            <h4 className="text-primary text-sm font-semibold mb-2">{category.category}</h4>
                            {category.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link to="/blogs" className="block py-3 text-foreground font-medium">Blogs</Link>
                <Link to="/about" className="block py-3 text-foreground font-medium">About</Link>
                <Link to="/contact" className="block py-3 text-foreground font-medium">Contact</Link>
                <Link to="/contact" className="btn-primary block text-center mt-4">Get in Touch</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
