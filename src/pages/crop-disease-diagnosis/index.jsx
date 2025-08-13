import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FarmerTabNavigation from '../../components/ui/FarmerTabNavigation';
import CameraCapture from './components/CameraCapture';
import ImageUpload from './components/ImageUpload';
import CropTypeSelector from './components/CropTypeSelector';
import ImagePreprocessing from './components/ImagePreprocessing';
import DiagnosisLoading from './components/DiagnosisLoading';
import AgriculturalChatbot from '../../components/ui/AgriculturalChatbot';

const CropDiseaseDiagnosis = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedCropType, setSelectedCropType] = useState('');
  const [captureMethod, setCaptureMethod] = useState('camera'); // 'camera' or 'upload'
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Store actual File object
  const [processingStage, setProcessingStage] = useState('selection'); // 'selection', 'preprocessing', 'analyzing', 'complete'
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showHelp, setShowHelp] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Mock notifications
  const notifications = [
    {
      message: "New disease alert: Cassava Mosaic Disease detected in your region",
      time: "2 hours ago",
      read: false
    },
    {
      message: "Weather update: High humidity may increase fungal disease risk",
      time: "5 hours ago",
      read: false
    },
    {
      message: "Your diagnosis from yesterday is ready for review",
      time: "1 day ago",
      read: true
    }
  ];

  // Language content
  const content = {
    en: {
      title: "Crop Disease Diagnosis",
      subtitle: "AI-powered disease detection for your crops",
      selectCrop: "First, select your crop type",
      chooseMethod: "Choose capture method",
      camera: "Camera",
      upload: "Upload",
      startDiagnosis: "Start Diagnosis",
      help: "Help",
      back: "Back",
      offline: "Offline Mode",
      offlineMessage: "You\'re currently offline. Images will be processed when connection is restored.",
      helpTitle: "How to get the best results",
      helpTips: [
        "Ensure good lighting conditions",
        "Focus on affected plant parts",
        "Hold camera steady for clear shots",
        "Include multiple angles if possible",
        "Avoid shadows and reflections"
      ]
    },
    ha: {
      title: "Gano Cutar Rashin Lafiya",
      subtitle: "Amfani da AI don gano cututtukan amfanin gona",
      selectCrop: "Da farko, zaɓi nau'in amfanin gona",
      chooseMethod: "Zaɓi hanyar ɗaukar hoto",
      camera: "Kamara",
      upload: "Loda Hoto",
      startDiagnosis: "Fara Bincike",
      help: "Taimako",
      back: "Komawa",
      offline: "Yanayin Kashe Intanet",
      offlineMessage: "Yanzu ba ku da intanet. Za a sarrafa hotunan lokacin da aka dawo da haɗin gwiwa.",
      helpTitle: "Yadda za ku sami mafi kyawun sakamako",
      helpTips: [
        "Tabbatar da kyakkyawan haske",
        "Mayar da hankali kan sassan shuka da suka shafe",
        "Riƙe kamara da kwanciyar hankali don bayyanannun harbe",
        "Haɗa kusurwoyi da yawa idan zai yiwu",
        "Guje wa inuwa da tunani"
      ]
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleCropSelect = (cropType) => {
    setSelectedCropType(cropType);
  };

  const handleImageCapture = (image, file = null) => {
    setSelectedImage(image);
    setSelectedImageFile(file); // Store the actual File object
    setProcessingStage('preprocessing');
  };

  const handleImageUpload = (image, file = null) => {
    setSelectedImage(image);
    setSelectedImageFile(file); // Store the actual File object
    setProcessingStage('preprocessing');
  };

  const handleProcessingComplete = (processedData) => {
    setProcessingStage('analyzing');
  };

  const handleDiagnosisComplete = (diagnosisResult) => {
    // Navigate to results page with diagnosis data
    navigate('/diagnosis-results-treatment', { 
      state: { 
        diagnosis: diagnosisResult,
        image: selectedImage,
        cropType: selectedCropType
      }
    });
  };

  const resetDiagnosis = () => {
    setSelectedImage(null);
    setProcessingStage('selection');
    setSelectedCropType('');
  };

  const getCurrentContent = () => content?.[currentLanguage] || content?.en;
  const currentContent = getCurrentContent();

  const renderMainContent = () => {
    switch (processingStage) {
      case 'preprocessing':
        return (
          <ImagePreprocessing
            image={selectedImage}
            selectedCropType={selectedCropType}
            onProcessingComplete={handleProcessingComplete}
          />
        );

      case 'analyzing':
        return (
          <DiagnosisLoading
            cropType={selectedCropType}
            imageFile={selectedImageFile} // Pass the actual File object
            onComplete={handleDiagnosisComplete}
          />
        );

      default:
        return (
          <div className="space-y-6">
            {/* Crop Type Selection */}
            <CropTypeSelector
              selectedCrop={selectedCropType}
              onCropSelect={handleCropSelect}
            />
            {/* Capture Method Selection */}
            {selectedCropType && (
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-heading-semibold text-foreground">
                  {currentContent?.chooseMethod}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCaptureMethod('camera')}
                    className={`p-4 rounded-agricultural-lg border-2 transition-all ${
                      captureMethod === 'camera' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Camera" size={32} color={captureMethod === 'camera' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
                      <span className="text-sm font-body text-foreground">{currentContent?.camera}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCaptureMethod('upload')}
                    className={`p-4 rounded-agricultural-lg border-2 transition-all ${
                      captureMethod === 'upload' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name="Upload" size={32} color={captureMethod === 'upload' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
                      <span className="text-sm font-body text-foreground">{currentContent?.upload}</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
            {/* Image Capture/Upload Interface */}
            {selectedCropType && (
              <div className="space-y-4">
                {captureMethod === 'camera' ? (
                  <CameraCapture
                    onImageCapture={handleImageCapture}
                    selectedCropType={selectedCropType}
                    isProcessing={processingStage !== 'selection'}
                  />
                ) : (
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    selectedCropType={selectedCropType}
                    isProcessing={processingStage !== 'selection'}
                  />
                )}
              </div>
            )}
            {/* AI Assistant Button */}
            {selectedCropType && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowChatbot(true)}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:border-primary/40"
                >
                  Ask AI Assistant
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        userType="farmer" 
        notifications={notifications}
        onMenuToggle={() => {}}
      />
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/farmer-dashboard"
                className="p-2 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted lg:hidden"
              >
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-heading font-heading-bold text-foreground">
                  {currentContent?.title}
                </h1>
                <p className="text-sm font-body text-text-secondary">
                  {currentContent?.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Offline Indicator */}
              {isOffline && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-agricultural-md">
                  <Icon name="WifiOff" size={16} color="var(--color-warning)" />
                  <span className="text-xs font-caption text-warning">
                    {currentContent?.offline}
                  </span>
                </div>
              )}
              
              {/* Help Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowHelp(true)}
              >
                <Icon name="HelpCircle" size={20} />
              </Button>
              
              {/* Reset Button */}
              {processingStage !== 'selection' && (
                <Button
                  variant="outline"
                  onClick={resetDiagnosis}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Offline Message */}
          {isOffline && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-agricultural-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} color="var(--color-warning)" className="mt-0.5" />
                <div>
                  <h4 className="text-sm font-heading font-heading-semibold text-warning mb-1">
                    {currentContent?.offline}
                  </h4>
                  <p className="text-sm font-body text-text-secondary">
                    {currentContent?.offlineMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-card border border-border rounded-agricultural-lg p-6">
            {renderMainContent()}
          </div>
        </div>
      </main>
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
          <div className="bg-popover border border-border rounded-agricultural-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-semibold text-popover-foreground">
                {currentContent?.helpTitle}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-3">
              {currentContent?.helpTips?.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm font-body text-popover-foreground">{tip}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <Button
                variant="default"
                fullWidth
                onClick={() => setShowHelp(false)}
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* AI Chatbot */}
      <AgriculturalChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        cropContext={{
          cropType: selectedCropType,
          location: 'Nigeria',
          season: new Date()?.getMonth() >= 4 && new Date()?.getMonth() <= 9 ? 'rainy' : 'dry'
        }}
      />
      <FarmerTabNavigation />
    </div>
  );
};

export default CropDiseaseDiagnosis;