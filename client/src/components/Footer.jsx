import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t dark:border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              GigSEO Analyzer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Optimize your Fiverr and Upwork gigs for better rankings and more sales.
              Get instant SEO analysis and competitor insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">About Us</Link></li>
              <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-dark-border mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} GigSEO Analyzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;