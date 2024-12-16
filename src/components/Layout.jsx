import React from 'react';
import { Outlet, Navigate } from 'react-router';
import Header from './Header';


function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;