import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiTrendingUp, FiSearch, FiTarget, FiBarChart2, FiUsers, FiAward } from 'react-icons/fi';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'Deep SEO Analysis',
      description: 'Comprehensive analysis of your gig\'s title, description, and tags with actionable recommendations.'
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: 'Competitor Insights',
      description: 'See what top-performing gigs are doing and get strategic recommendations to outrank them.'
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: 'Smart Tag Suggestions',
      description: 'Get AI-powered tag recommendations that actually help buyers find your gig.'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Rank Tracking',
      description: 'Monitor your gig\'s ranking position for key search terms over time.'
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Market Analysis',
      description: 'Understand market demand and pricing strategies in your niche.'
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Gig Score',
      description: 'Get a comprehensive score out of 100 with specific improvement areas.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Paste Your Gig URL',
      description: 'Simply copy and paste your Fiverr or Upwork gig link into our analyzer.'
    },
    {
      number: '2',
      title: 'Get Instant Analysis',
      description: 'Our AI analyzes your gig against SEO best practices and top competitors.'
    },
    {
      number: '3',
      title: 'Optimize & Rank Higher',
      description: 'Implement our suggestions and watch your gig climb the search results.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Optimize Your Fiverr & Upwork Gigs
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get instant SEO analysis, keyword suggestions, and competitor insights 
            to boost your gig's visibility and sales.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Free
              </Link>
              <Link to="/pricing" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                View Pricing
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to optimize your freelance gigs and stand out from the competition
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
            Three simple steps to optimize your gig
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Boost Your Gig Rankings?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who have improved their gig visibility and increased their sales.
          </p>
          {!isAuthenticated ? (
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Start Free Trial
            </Link>
          ) : (
            <Link to="/analysis/new" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Analyze Your First Gig
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;