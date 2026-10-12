import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { CatalogPlaceholder } from './pages/CatalogPlaceholder';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/katalog" element={<CatalogPlaceholder />} />
      {/* Fallback route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
};
