import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ThreeScene } from "@/components/ThreeScene";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene variant="hero" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-display font-bold gradient-text mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
