import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="container-app py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
