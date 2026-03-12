import React from 'react';
import { Outlet } from 'react-router-dom';
import Slidebar from './slidebar';
import Header from './header';

const AdminLayout = () => {
  return (
    <div className="container-fluid mx-auto px-3 lg:px-0 lg:pr-3">
      <div className="flex gap-0 lg:gap-4">
        <div className="hidden lg:block fixed left-0 top-0 h-full w-[262px]">
          <Slidebar />
        </div>

        <div className="flex-1 w-full lg:ml-[262px] px-3 lg:px-4 pt-3">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
