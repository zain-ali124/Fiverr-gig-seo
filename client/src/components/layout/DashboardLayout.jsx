import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../dashboard/DashboardHeader';
import Sidebar from '../dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;