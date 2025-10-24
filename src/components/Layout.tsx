import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';
  const isLoginPage = location.pathname === '/login';
  return <div className={`flex flex-col min-h-screen ${isDashboardPage ? 'bg-[#121212]' : 'bg-white'}`}>
      {!isDashboardPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>;
};