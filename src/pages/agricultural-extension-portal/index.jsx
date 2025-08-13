import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ExtensionSidebar from '../../components/ui/ExtensionSidebar';
import DashboardOverview from './components/DashboardOverview';
import FarmerDirectory from './components/FarmerDirectory';
import ConsultationRequests from './components/ConsultationRequests';
import RegionalDiseaseMap from './components/RegionalDiseaseMap';
import DataVisualizationDashboard from './components/DataVisualizationDashboard';

const AgriculturalExtensionPortal = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Language content
  const content = {
    en: {
      title: 'Agricultural Extension Portal - CropCare AI',
      pageTitle: 'Extension Portal Dashboard',
      pageSubtitle: 'Comprehensive agricultural support and monitoring system',
      welcomeMessage: 'Welcome back, Dr. Amina Hassan',
      lastLogin: 'Last login: Today at 09:15 AM'
    },
    ha: {
      title: 'Tashar Fadada Noma - CropCare AI',
      pageTitle: 'Dashboard na Tashar Fadada',
      pageSubtitle: 'Tsarin tallafi da sa ido kan noma mai cikakke',
      welcomeMessage: 'Barka da dawowa, Dr. Amina Hassan',
      lastLogin: 'Shiga na karshe: Yau da karfe 09:15 na safe'
    },
    yo: {
      title: 'Eto Agbedemeji Ogbin - CropCare AI',
      pageTitle: 'Dashboard Eto Agbedemeji',
      pageSubtitle: 'Eto atilẹyin ati abojuto ogbin to peye',
      welcomeMessage: 'Kaabo pada, Dr. Amina Hassan',
      lastLogin: 'Wiwole to kẹhin: Loni ni 09:15 owuro'
    },
    ig: {
      title: 'Portal Nkwado Oru Ugbo - CropCare AI',
      pageTitle: 'Dashboard Portal Nkwado',
      pageSubtitle: 'Usoro nkwado na nlekota oru ugbo zuru oke',
      welcomeMessage: 'Nnọọ azụ, Dr. Amina Hassan',
      lastLogin: 'Mbanye ikpeazụ: Taa na 09:15 ụtụtụ'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const notifications = [
    {
      id: 1,
      message: "New consultation request from Adebayo Ogundimu regarding cassava leaf spots",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      message: "Disease outbreak alert: Increased yam anthracnose cases in Eastern Region",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      message: "Weekly report: 89% treatment success rate achieved this week",
      time: "2 hours ago",
      read: true
    }
  ];

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{currentContent?.title}</title>
        <meta name="description" content="Agricultural Extension Portal for crop disease management and farmer support in Nigeria" />
        <meta name="keywords" content="agriculture, extension, crop disease, farmer support, Nigeria" />
      </Helmet>
      <GlobalHeader 
        userType="extension"
        notifications={notifications}
        onMenuToggle={toggleSidebar}
      />
      <ExtensionSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-heading font-heading-bold text-foreground">
                {currentContent?.pageTitle}
              </h1>
              <div className="text-right">
                <p className="text-sm font-body text-text-secondary">
                  {currentContent?.lastLogin}
                </p>
              </div>
            </div>
            <p className="text-lg font-body text-text-secondary mb-4">
              {currentContent?.pageSubtitle}
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-agricultural-md p-4">
              <p className="text-primary font-body">
                {currentContent?.welcomeMessage}
              </p>
            </div>
          </div>

          {/* Dashboard Overview Stats */}
          <div className="mb-8">
            <DashboardOverview />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Farmer Directory */}
            <div className="xl:col-span-1">
              <FarmerDirectory />
            </div>

            {/* Consultation Requests */}
            <div className="xl:col-span-1">
              <ConsultationRequests />
            </div>
          </div>

          {/* Regional Disease Monitoring */}
          <div className="mb-8">
            <RegionalDiseaseMap />
          </div>

          {/* Data Visualization Dashboard */}
          <div className="mb-8">
            <DataVisualizationDashboard />
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-card border border-border rounded-agricultural-md p-6">
            <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center space-y-2 p-4 text-center hover:bg-muted rounded-agricultural-md transition-agricultural">
                <div className="w-12 h-12 bg-primary/10 rounded-agricultural-md flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm font-body text-foreground">Generate Report</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 text-center hover:bg-muted rounded-agricultural-md transition-agricultural">
                <div className="w-12 h-12 bg-secondary/10 rounded-agricultural-md flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <span className="text-sm font-body text-foreground">Send SMS Alert</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 text-center hover:bg-muted rounded-agricultural-md transition-agricultural">
                <div className="w-12 h-12 bg-accent/10 rounded-agricultural-md flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <span className="text-sm font-body text-foreground">Update Resources</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 text-center hover:bg-muted rounded-agricultural-md transition-agricultural">
                <div className="w-12 h-12 bg-success/10 rounded-agricultural-md flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <span className="text-sm font-body text-foreground">Schedule Training</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgriculturalExtensionPortal;