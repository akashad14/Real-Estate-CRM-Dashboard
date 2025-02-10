import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

// Define the type for the props
interface LayoutProps {
  children: ReactNode; // ReactNode is the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;