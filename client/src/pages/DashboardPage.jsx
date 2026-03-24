import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisAPI } from '../services/api';
import { FiPlus, FiBarChart2, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';
import Loader from '../components/common/Loader';

const DashboardPage = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    averageScore: 0,
    bestScore: 0,
    recentActivity: []
  });

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await analysisAPI.getUserAnalyses();
      const data = response.data.data.analyses;
      setAnalyses(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to fetch analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (data.length === 0) return;

    const total = data.length;
    const avgScore = data.reduce((acc, curr) => acc + (curr.analysisResults?.gigScore || 0), 0) / total;
    const best = Math.max(...data.map(item => item.analysisResults?.gigScore || 0));
    
    setStats({
      totalAnalyses: total,
      averageScore: Math.round(avgScore),
      bestScore: best,
      recentActivity: data.slice(0, 5)
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's an overview of your gig performance
          </p>
        </div>
        <Link to="/analysis/new" className="btn-primary flex items-center space-x-2">
          <FiPlus />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Analyses</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalAnalyses}</p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <FiBarChart2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageScore}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.bestScore}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <FiAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plan</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{user?.plan}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Analyses</h2>
        
        {analyses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No analyses yet</p>
            <Link to="/analysis/new" className="btn-primary inline-flex items-center space-x-2">
              <FiPlus />
              <span>Analyze Your First Gig</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <Link
                key={analysis._id}
                to={`/analysis/${analysis._id}`}
                className="block p-4 border border-gray-200 dark:border-dark-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {analysis.gigData?.title || 'Untitled Gig'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {analysis.analysisResults?.gigScore || 0}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Gig Score</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {user?.plan === 'free' && (
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Upgrade to Pro</h3>
              <p className="opacity-90">Get unlimited analyses, competitor tracking, and advanced insights</p>
            </div>
            <Link to="/pricing" className="mt-4 md:mt-0 bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;