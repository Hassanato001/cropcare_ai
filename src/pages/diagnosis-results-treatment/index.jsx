import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FarmerTabNavigation from '../../components/ui/FarmerTabNavigation';
import DiagnosisHeader from './components/DiagnosisHeader';
import ImageAnalysisCard from './components/ImageAnalysisCard';
import DiseaseIdentificationCard from './components/DiseaseIdentificationCard';
import TreatmentRecommendations from './components/TreatmentRecommendations';
import CommunityInsights from './components/CommunityInsights';
import ActionButtons from './components/ActionButtons';
import AgriculturalChatbot from '../../components/ui/AgriculturalChatbot';
import Button from '../../components/ui/Button';


const DiagnosisResultsTreatment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showChatbot, setShowChatbot] = useState(false);

  // Get diagnosis data from navigation state or use fallback
  const diagnosisData = location?.state?.diagnosis || {
    disease: {
      name: 'Cassava Mosaic Disease',
      scientificName: 'Cassava Mosaic Virus',
      confidence: 87,
      severity: 'moderate',
      description: 'A viral disease affecting cassava plants, causing characteristic mosaic patterns on leaves.'
    },
    symptoms: ['Yellow mosaic patterns', 'Leaf distortion', 'Stunted growth'],
    affectedAreas: [
      { x: 25, y: 30, width: 15, height: 20, severity: 75 },
      { x: 60, y: 45, width: 12, height: 18, severity: 60 }
    ],
    treatments: {
      immediate: [{
        title: 'Remove Infected Plants',
        description: 'Immediately remove and destroy infected plants',
        steps: ['Identify infected plants', 'Remove carefully', 'Destroy infected material'],
        cost: 500,
        duration: '1 hour',
        materials: ['Gloves', 'Pruning tools']
      }],
      organic: [{
        title: 'Resistant Varieties',
        description: 'Plant resistant cassava varieties',
        steps: ['Source resistant varieties', 'Prepare planting material', 'Plant following best practices'],
        cost: 2000,
        duration: '1 season',
        materials: ['Resistant cuttings', 'Tools']
      }],
      chemical: [{
        title: 'Whitefly Control',
        description: 'Control whitefly vectors with appropriate insecticides',
        steps: ['Identify whitefly presence', 'Select appropriate insecticide', 'Apply following label instructions'],
        cost: 3500,
        duration: '4-6 weeks',
        materials: ['Insecticide', 'Sprayer']
      }]
    },
    economicImpact: 'high',
    spreadRisk: 'high'
  };

  const imageUrl = location?.state?.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop";
  const cropType = location?.state?.cropType || 'cassava';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const communityInsights = [
    {
      farmerName: "Amina Bello",
      location: "Kaduna State",
      distance: 2.3,
      timeAgo: "2 weeks ago",
      successRate: 85,
      treatmentUsed: "Resistant varieties + field sanitation",
      experience: `I had similar virus symptoms on my cassava farm. Switched to resistant varieties and maintained strict field hygiene. Saw significant improvement in the next planting season.`,
      cropType: "Cassava",
      treatmentCost: 2500,
      treatmentDuration: "1 season",
      helpfulVotes: 12
    },
    {
      farmerName: "Ibrahim Musa",
      location: "Kano State",
      distance: 5.7,
      timeAgo: "1 month ago",
      successRate: 92,
      treatmentUsed: "Vector control + resistant varieties",
      experience: `This viral disease affected my entire field. Extension officer recommended controlling whiteflies and planting resistant varieties. Combined approach worked very well.`,
      cropType: "Cassava",
      treatmentCost: 4200,
      treatmentDuration: "6 weeks + 1 season",
      helpfulVotes: 18
    }
  ];

  const notifications = [
    {
      message: "New AI diagnosis completed successfully",
      time: "Just now",
      read: false
    },
    {
      message: "Treatment recommendations ready for review",
      time: "2 minutes ago",
      read: false
    },
    {
      message: "Weather alert: Monitor crop conditions during high humidity",
      time: "1 hour ago",
      read: true
    }
  ];

  const handleBack = () => {
    navigate('/crop-disease-diagnosis');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CropCare AI - Diagnosis Results',
        text: `Diagnosed: ${diagnosisData?.disease?.localizations?.[currentLanguage]?.commonName} with ${diagnosisData?.confidence}% confidence`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    // Save diagnosis to local storage or send to backend
    const savedDiagnoses = JSON.parse(localStorage.getItem('cropcare-diagnoses') || '[]');
    const newDiagnosis = {
      id: Date.now(),
      date: new Date()?.toISOString(),
      disease: diagnosisData?.disease?.localizations?.[currentLanguage]?.commonName,
      confidence: diagnosisData?.confidence,
      imageUrl: diagnosisData?.imageUrl,
      severity: diagnosisData?.disease?.severity
    };
    savedDiagnoses?.unshift(newDiagnosis);
    localStorage.setItem('cropcare-diagnoses', JSON.stringify(savedDiagnoses));
    alert('Diagnosis saved to history!');
  };

  const handleSaveToHistory = () => {
    handleSave();
    navigate('/diagnosis-history-tracking');
  };

  const handleShareWithExtension = () => {
    // Mock sharing with extension officer
    alert('Diagnosis shared with your local agricultural extension officer. They will contact you within 24 hours.');
  };

  const handleBookConsultation = () => {
    // Mock consultation booking
    alert('Consultation booking feature will be available soon. For immediate help, contact your local extension officer.');
  };

  const handleSetReminder = (reminderType) => {
    // Mock reminder setting
    const reminderMessages = {
      '1day': 'Reminder set for tomorrow',
      '3days': 'Reminder set for 3 days from now',
      '1week': 'Reminder set for next week',
      'custom': 'Custom reminder feature coming soon'
    };
    alert(reminderMessages?.[reminderType] || 'Reminder set successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        userType="farmer" 
        notifications={notifications}
        onMenuToggle={() => {}}
      />
      <div className="pt-16 pb-20 lg:pb-8">
        <DiagnosisHeader
          onShare={handleShare}
          onSave={handleSave}
          onBack={handleBack}
        />

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* AI Assistant Button */}
          <div className="flex justify-center lg:justify-end">
            <Button
              variant="default"
              onClick={() => setShowChatbot(true)}
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Ask AI About Treatment
            </Button>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <ImageAnalysisCard
              imageUrl={imageUrl}
              confidence={diagnosisData?.disease?.confidence || 87}
              affectedAreas={diagnosisData?.affectedAreas || []}
            />
            
            <DiseaseIdentificationCard
              disease={diagnosisData?.disease}
            />
            
            <TreatmentRecommendations
              treatments={diagnosisData?.treatments}
            />
            
            <CommunityInsights
              insights={communityInsights}
            />
            
            <ActionButtons
              onSaveToHistory={handleSaveToHistory}
              onShareWithExtension={handleShareWithExtension}
              onBookConsultation={handleBookConsultation}
              onSetReminder={handleSetReminder}
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ImageAnalysisCard
                imageUrl={imageUrl}
                confidence={diagnosisData?.disease?.confidence || 87}
                affectedAreas={diagnosisData?.affectedAreas || []}
              />
              
              <DiseaseIdentificationCard
                disease={diagnosisData?.disease}
              />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <TreatmentRecommendations
                treatments={diagnosisData?.treatments}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <CommunityInsights
                insights={communityInsights}
              />
              
              <ActionButtons
                onSaveToHistory={handleSaveToHistory}
                onShareWithExtension={handleShareWithExtension}
                onBookConsultation={handleBookConsultation}
                onSetReminder={handleSetReminder}
              />
            </div>
          </div>
        </div>
      </div>
      {/* AI Chatbot */}
      <AgriculturalChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        cropContext={{
          cropType: cropType,
          diseaseDetected: diagnosisData?.disease?.name,
          severity: diagnosisData?.disease?.severity,
          location: 'Nigeria',
          analysisDate: new Date()?.toISOString()
        }}
      />
      <FarmerTabNavigation />
    </div>
  );
};

export default DiagnosisResultsTreatment;