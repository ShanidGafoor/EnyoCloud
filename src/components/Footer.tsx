import { motion } from 'framer-motion';

const footerLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground to-black/90" />
      
      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="inline-block group">
              <span className="text-2xl font-bold text-background/90 transition-colors duration-300 group-hover:text-background">
                Enyo<span className="text-primary">Cloud</span>
                <span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-background/60 mt-3 text-sm leading-relaxed max-w-xs">
              Transforming businesses with intelligent cloud solutions and enterprise expertise.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-background/60 hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <p className="text-background/50 text-sm">
              © {currentYear} EnyoCloud. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
