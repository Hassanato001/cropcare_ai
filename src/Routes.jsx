import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EducationalResources from './pages/educational-resources';
import FarmerDashboard from './pages/farmer-dashboard';
import DiagnosisHistoryTracking from './pages/diagnosis-history-tracking';
import DiagnosisResultsTreatment from './pages/diagnosis-results-treatment';
import CropDiseaseDiagnosis from './pages/crop-disease-diagnosis';
import AgriculturalExtensionPortal from './pages/agricultural-extension-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AgriculturalExtensionPortal />} />
        <Route path="/educational-resources" element={<EducationalResources />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/diagnosis-history-tracking" element={<DiagnosisHistoryTracking />} />
        <Route path="/diagnosis-results-treatment" element={<DiagnosisResultsTreatment />} />
        <Route path="/crop-disease-diagnosis" element={<CropDiseaseDiagnosis />} />
        <Route path="/agricultural-extension-portal" element={<AgriculturalExtensionPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
