import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Slidebar from './slidebar';
import Header from './header';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="container-fluid mx-auto px-3 lg:px-0 lg:pr-3">
      <div className="flex gap-0 lg:gap-4">
        {/* Sidebar */}
        <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-[262px] z-[1001] lg:z-auto">
          <Slidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* Content */}
        <div className="flex-1 w-full lg:ml-[262px] px-3 lg:px-4 pt-3">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
