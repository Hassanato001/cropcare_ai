import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FarmerTabNavigation from '../../components/ui/FarmerTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DiagnosisCard from './components/DiagnosisCard';
import FilterPanel from './components/FilterPanel';
import DiagnosisDetailModal from './components/DiagnosisDetailModal';
import AnalyticsSection from './components/AnalyticsSection';
import SearchBar from './components/SearchBar';

const DiagnosisHistoryTracking = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeView, setActiveView] = useState('list'); // 'list', 'analytics'
  const [sortBy, setSortBy] = useState('date-desc');
  const [filters, setFilters] = useState({
    cropType: '',
    diseaseCategory: '',
    treatmentStatus: '',
    confidence: '',
    dateFrom: '',
    dateTo: ''
  });

  // Mock diagnosis data
  const mockDiagnoses = [
    {
      id: 1,
      cropType: "Cassava",
      diseaseName: "Cassava Bacterial Blight",
      confidence: 94,
      date: "2025-01-10T08:30:00Z",
      treatmentStatus: "in-progress",
      treatmentProgress: 65,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      location: "Farm Block A",
      description: `Bacterial blight is a serious disease affecting cassava plants, characterized by angular leaf spots with yellow halos. The disease spreads rapidly in humid conditions and can cause significant yield losses if not treated promptly.\n\nEarly detection and proper treatment are crucial for managing this disease effectively.`
    },
    {
      id: 2,
      cropType: "Yam",
      diseaseName: "Yam Anthracnose",
      confidence: 87,
      date: "2025-01-08T14:15:00Z",
      treatmentStatus: "completed",
      treatmentProgress: 100,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      location: "Farm Block B",
      description: `Anthracnose is a fungal disease that affects yam tubers and leaves, causing dark lesions and rotting. The disease is most prevalent during wet seasons and can be managed with proper fungicide application and cultural practices.\n\nRegular monitoring and early intervention are key to preventing severe damage.`
    },
    {
      id: 3,
      cropType: "Maize",
      diseaseName: "Maize Leaf Spot",
      confidence: 91,
      date: "2025-01-05T11:45:00Z",
      treatmentStatus: "completed",
      treatmentProgress: 100,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
      location: "Farm Block C",
      description: `Leaf spot diseases in maize are caused by various fungal pathogens and appear as small, circular to oval spots on leaves. These diseases can reduce photosynthetic capacity and affect grain yield.\n\nProper crop rotation and fungicide applications help manage these diseases effectively.`
    },
    {
      id: 4,
      cropType: "Cassava",
      diseaseName: "Cassava Mosaic Virus",
      confidence: 89,
      date: "2025-01-03T16:20:00Z",
      treatmentStatus: "pending",
      treatmentProgress: 0,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      location: "Farm Block A",
      description: `Cassava Mosaic Virus causes characteristic mosaic patterns on leaves with yellow and green patches. This viral disease is transmitted by whiteflies and can severely impact plant growth and tuber yield.\n\nManagement involves removing infected plants and controlling whitefly populations.`
    },
    {
      id: 5,
      cropType: "Yam",
      diseaseName: "Yam Mosaic Virus",
      confidence: 76,
      date: "2024-12-28T09:10:00Z",
      treatmentStatus: "in-progress",
      treatmentProgress: 40,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      location: "Farm Block D",
      description: `Yam Mosaic Virus affects yam plants causing stunted growth and reduced tuber size. The virus is spread through infected planting materials and aphid vectors.\n\nUsing virus-free planting materials and controlling aphid populations are essential for management.`
    },
    {
      id: 6,
      cropType: "Maize",
      diseaseName: "Maize Streak Virus",
      confidence: 83,
      date: "2024-12-25T13:30:00Z",
      treatmentStatus: "completed",
      treatmentProgress: 100,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
      location: "Farm Block E",
      description: `Maize Streak Virus causes characteristic streaking patterns on maize leaves and can significantly reduce grain yield. The virus is transmitted by leafhoppers and is most problematic in areas with high vector populations.\n\nResistant varieties and vector control are the primary management strategies.`
    }
  ];

  const notifications = [
    {
      message: "Treatment reminder: Apply second dose of fungicide to Block A cassava",
      time: "2 hours ago",
      read: false
    },
    {
      message: "Weather alert: High humidity expected - monitor for disease symptoms",
      time: "1 day ago",
      read: false
    },
    {
      message: "Treatment completed successfully for Yam Anthracnose in Block B",
      time: "3 days ago",
      read: true
    }
  ];

  // Language change handler
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('cropcare-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Filter and search logic
  const filteredDiagnoses = mockDiagnoses?.filter(diagnosis => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm?.toLowerCase();
      const matchesSearch = 
        diagnosis?.diseaseName?.toLowerCase()?.includes(searchLower) ||
        diagnosis?.cropType?.toLowerCase()?.includes(searchLower) ||
        diagnosis?.location?.toLowerCase()?.includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Crop type filter
    if (filters?.cropType && diagnosis?.cropType?.toLowerCase() !== filters?.cropType) {
      return false;
    }

    // Treatment status filter
    if (filters?.treatmentStatus && diagnosis?.treatmentStatus !== filters?.treatmentStatus) {
      return false;
    }

    // Confidence filter
    if (filters?.confidence) {
      if (filters?.confidence === 'high' && diagnosis?.confidence < 90) return false;
      if (filters?.confidence === 'medium' && (diagnosis?.confidence < 70 || diagnosis?.confidence >= 90)) return false;
      if (filters?.confidence === 'low' && diagnosis?.confidence >= 70) return false;
    }

    // Date range filter
    if (filters?.dateFrom) {
      const diagnosisDate = new Date(diagnosis.date);
      const fromDate = new Date(filters.dateFrom);
      if (diagnosisDate < fromDate) return false;
    }

    if (filters?.dateTo) {
      const diagnosisDate = new Date(diagnosis.date);
      const toDate = new Date(filters.dateTo);
      if (diagnosisDate > toDate) return false;
    }

    return true;
  });

  // Sort logic
  const sortedDiagnoses = [...filteredDiagnoses]?.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'confidence-desc':
        return b?.confidence - a?.confidence;
      case 'confidence-asc':
        return a?.confidence - b?.confidence;
      case 'crop-asc':
        return a?.cropType?.localeCompare(b?.cropType);
      default:
        return 0;
    }
  });

  const handleDiagnosisClick = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setShowDetailModal(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      cropType: '',
      diseaseCategory: '',
      treatmentStatus: '',
      confidence: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const exportToPDF = () => {
    // Mock PDF export functionality
    alert('PDF export functionality would be implemented here');
  };

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'confidence-desc', label: 'Highest Confidence' },
    { value: 'confidence-asc', label: 'Lowest Confidence' },
    { value: 'crop-asc', label: 'Crop Type A-Z' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        userType="farmer" 
        notifications={notifications}
        onMenuToggle={() => {}}
      />
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-foreground">
                  Diagnosis History
                </h1>
                <p className="text-sm font-caption text-text-secondary mt-1">
                  Track your crop health patterns and treatment progress
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="hidden sm:flex items-center space-x-2 bg-muted rounded-agricultural-md p-1">
                <button
                  onClick={() => setActiveView('list')}
                  className={`px-3 py-2 rounded-agricultural-sm text-sm font-body transition-agricultural ${
                    activeView === 'list' ?'bg-background text-foreground shadow-agricultural-sm' :'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} className="mr-2" />
                  List
                </button>
                <button
                  onClick={() => setActiveView('analytics')}
                  className={`px-3 py-2 rounded-agricultural-sm text-sm font-body transition-agricultural ${
                    activeView === 'analytics' ?'bg-background text-foreground shadow-agricultural-sm' :'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Mobile View Toggle */}
            <div className="sm:hidden flex items-center space-x-2 bg-muted rounded-agricultural-md p-1 mb-4">
              <button
                onClick={() => setActiveView('list')}
                className={`flex-1 px-3 py-2 rounded-agricultural-sm text-sm font-body transition-agricultural ${
                  activeView === 'list' ?'bg-background text-foreground shadow-agricultural-sm' :'text-text-secondary'
                }`}
              >
                <Icon name="List" size={16} className="mr-2" />
                List
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={`flex-1 px-3 py-2 rounded-agricultural-sm text-sm font-body transition-agricultural ${
                  activeView === 'analytics' ?'bg-background text-foreground shadow-agricultural-sm' :'text-text-secondary'
                }`}
              >
                <Icon name="BarChart3" size={16} className="mr-2" />
                Analytics
              </button>
            </div>

            {/* Search and Controls */}
            {activeView === 'list' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search by disease, crop, or location..."
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 bg-background border border-border rounded-agricultural-md text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {sortOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>

                  {/* Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Filters</span>
                  </Button>

                  {/* Export Button */}
                  <Button
                    variant="outline"
                    onClick={exportToPDF}
                    iconName="Download"
                    iconPosition="left"
                    className="whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {activeView === 'list' ? (
                <>
                  {/* Results Summary */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-card border border-border rounded-agricultural-md">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="FileText" size={16} color="var(--color-primary)" />
                        <span className="text-sm font-body text-foreground">
                          {sortedDiagnoses?.length} diagnoses found
                        </span>
                      </div>
                      {searchTerm && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Search" size={14} color="var(--color-text-secondary)" />
                          <span className="text-xs font-caption text-text-secondary">
                            for "{searchTerm}"
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {(searchTerm || Object.values(filters)?.some(f => f)) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          handleClearFilters();
                        }}
                        iconName="X"
                        iconPosition="left"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Diagnosis Cards */}
                  {sortedDiagnoses?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {sortedDiagnoses?.map((diagnosis) => (
                        <DiagnosisCard
                          key={diagnosis?.id}
                          diagnosis={diagnosis}
                          onClick={handleDiagnosisClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Search" size={24} color="var(--color-text-secondary)" />
                      </div>
                      <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
                        No diagnoses found
                      </h3>
                      <p className="text-sm font-caption text-text-secondary mb-6">
                        Try adjusting your search terms or filters
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          handleClearFilters();
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <AnalyticsSection />
              )}
            </div>

            {/* Desktop Filter Sidebar */}
            {activeView === 'list' && (
              <FilterPanel
                isOpen={false}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                className="hidden lg:block flex-shrink-0"
              />
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
      {/* Diagnosis Detail Modal */}
      <DiagnosisDetailModal
        diagnosis={selectedDiagnosis}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedDiagnosis(null);
        }}
      />
      <FarmerTabNavigation />
    </div>
  );
};

export default DiagnosisHistoryTracking;