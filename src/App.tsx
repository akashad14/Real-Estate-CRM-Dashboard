// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage'; 
import LeadsPage from './pages/LeadsPage';
import PropertiesPage from '../src/pages/PropertiesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/" element={<DashboardPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;