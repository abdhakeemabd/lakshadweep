import React from 'react';
import { Outlet } from 'react-router-dom';
import Slidebar from './slidebar';
import Header from './header';

const AdminLayout = () => {
  return (
    <div className="container-fluid mx-auto px-3 lg:px-0 lg:pr-3">
      <div className="flex gap-0 lg:gap-4">
        <div className="hidden lg:block lg:w-[262px]">
          <Slidebar />
        </div>
        <div className="w-full pt-3">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
