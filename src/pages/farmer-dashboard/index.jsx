import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FarmerTabNavigation from '../../components/ui/FarmerTabNavigation';
import DiagnosisCard from './components/DiagnosisCard';
import WeatherWidget from './components/WeatherWidget';
import RecentDiagnosisHistory from './components/RecentDiagnosisHistory';
import QuickStats from './components/QuickStats';
import CropCalendar from './components/CropCalendar';
import EducationalCarousel from './components/EducationalCarousel';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Link } from 'react-router-dom';
import AgriculturalChatbot from '../../components/ui/AgriculturalChatbot';


const FarmerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      message: "Weather alert: High humidity detected in your area. Monitor crops for fungal diseases.",
      time: "2 hours ago",
      read: false
    },
    {
      message: "Your cassava diagnosis from yesterday shows improvement after treatment.",
      time: "1 day ago",
      read: false
    },
    {
      message: "New educational content available: Organic Pest Control Methods",
      time: "2 days ago",
      read: true
    }
  ];

  // Language content
  const content = {
    en: {
      pageTitle: "Dashboard",
      welcomeMessage: "Good morning, Farmer!",
      subtitle: "Monitor your crops and stay informed about their health",
      welcome: "Good morning",
      todayDate: "Today",
      quickActions: "Quick Actions",
      scanCrop: "Scan Crop"
    },
    ha: {
      pageTitle: "Dashboard",
      welcomeMessage: "Barka da safiya, Manomi!",
      subtitle: "Kula da amfanin gonakinku kuma ku kasance da masaniya game da lafiyarsu",
      welcome: "Barka da safiya",
      todayDate: "Yau",
      quickActions: "Saurin Ayyuka",
      scanCrop: "Duba Amfanin Gona"
    },
    yo: {
      pageTitle: "Dashboard",
      welcomeMessage: "E ku aaro, Agbe!",
      subtitle: "Toju awon eso yin ki e si ni imero nipa ilera won",
      welcome: "E ku aaro",
      todayDate: "Oni",
      quickActions: "Awon Ise Kiakia",
      scanCrop: "Wo Irugbin"
    },
    ig: {
      pageTitle: "Dashboard",
      welcomeMessage: "Ndewo, Onye oru ugbo!",
      subtitle: "Lelee ihe ubi gi ma mata otu ha si adi",
      welcome: "Ndewo",
      todayDate: "Taa",
      quickActions: "Ngwa Ngwa Oru",
      scanCrop: "Lelee Ihe Ubi"
    }
  };

  // Format date function
  const formatDate = (date, language) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    try {
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'en-US', options);
    } catch (error) {
      return date.toLocaleDateString('en-US', options);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        userType="farmer" 
        notifications={notifications}
        onMenuToggle={() => {}}
      />
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-foreground">
                {currentContent?.welcome}, Usman! 🌾
              </h1>
              <p className="text-sm lg:text-base font-body text-text-secondary mt-1">
                {currentContent?.todayDate}: {formatDate(new Date(), currentLanguage)}
              </p>
            </div>
            
            {/* AI Assistant Quick Access */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatbot(true)}
                iconName="MessageCircle"
                iconPosition="left"
                className="hidden md:flex bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:border-primary/40"
              >
                AI Assistant
              </Button>
              
              {/* Mobile AI Assistant Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowChatbot(true)}
                className="md:hidden bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
              >
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Primary Action Card - Full width on mobile, spans 2 columns on desktop */}
            <div className="lg:col-span-2">
              <DiagnosisCard />
            </div>

            {/* Weather Widget */}
            <div className="lg:col-span-1">
              <WeatherWidget />
            </div>
          </div>

          {/* Quick Stats */}
          <QuickStats className="mb-6" />

          {/* Quick Actions with AI Enhancement */}
          <div className="mb-8">
            <h2 className="text-lg font-heading font-heading-semibold text-foreground mb-4">
              {currentContent?.quickActions}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/crop-disease-diagnosis"
                className="bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 rounded-agricultural-lg p-4 hover:from-primary/20 hover:to-primary/30 transition-agricultural group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-agricultural-md flex items-center justify-center group-hover:bg-primary/30 transition-agricultural">
                    <Icon name="Camera" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-heading-semibold text-foreground">
                      {currentContent?.scanCrop}
                    </h3>
                    <p className="text-xs font-caption text-text-secondary mt-1">
                      AI-Powered Diagnosis
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* New AI Consultation Button */}
              <button 
                onClick={() => setShowChatbot(true)}
                className="bg-gradient-to-br from-accent/10 to-accent/20 border border-accent/20 rounded-agricultural-lg p-4 hover:from-accent/20 hover:to-accent/30 transition-agricultural group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-agricultural-md flex items-center justify-center group-hover:bg-accent/30 transition-agricultural">
                    <Icon name="Bot" size={24} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-heading-semibold text-foreground">
                      {currentLanguage === 'ha' ? 'Tambayar AI' : 'Ask AI'}
                    </h3>
                    <p className="text-xs font-caption text-text-secondary mt-1">
                      {currentLanguage === 'ha' ? 'Shawarwari na noma' : 'Farming advice'}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Recent Diagnosis History */}
            <div className="lg:col-span-1 xl:col-span-2">
              <RecentDiagnosisHistory />
            </div>

            {/* Crop Calendar */}
            <div className="lg:col-span-1 xl:col-span-1">
              <CropCalendar />
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-6">
            <EducationalCarousel />
          </div>

          {/* Pull to Refresh Indicator (Mobile) */}
          <div className="lg:hidden mt-8 text-center">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 mx-auto px-4 py-2 text-text-secondary hover:text-primary transition-agricultural"
            >
              <div className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </div>
              <span className="text-sm font-caption">Pull to refresh</span>
            </button>
          </div>
        </div>
      </main>
      {/* AI Chatbot */}
      <AgriculturalChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        cropContext={{
          location: 'Nigeria',
          season: new Date()?.getMonth() >= 4 && new Date()?.getMonth() <= 9 ? 'rainy' : 'dry',
          userType: 'farmer',
          dashboardContext: true
        }}
      />
      {/* Bottom Tab Navigation */}
      <FarmerTabNavigation />
    </div>
  );
};

export default FarmerDashboard;