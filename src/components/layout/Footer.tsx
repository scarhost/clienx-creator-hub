import { Link } from "react-router-dom";
import { Github, Twitter, Discord } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-gray-800 bg-[#0F172A]">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
                ClienxDev
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Create professional websites in minutes with our intuitive website builder platform.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} ClienxDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};