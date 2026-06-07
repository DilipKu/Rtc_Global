import React from 'react';
import KristNavbar from '../components/organisms/KristNavbar/KristNavbar';
import KristFooter from '../components/organisms/KristFooter/KristFooter';
import FloatingCTA from '../components/organisms/FloatingCTA/FloatingCTA';

import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout" style={{ paddingTop: '72px' }}>
      <KristNavbar />
      <main>{children || <Outlet />}</main>
      <KristFooter />
      <FloatingCTA />
    </div>
  );
};

export default MainLayout;
