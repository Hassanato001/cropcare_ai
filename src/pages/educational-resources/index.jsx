import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FarmerTabNavigation from '../../components/ui/FarmerTabNavigation';
import SearchAndFilters from './components/SearchAndFilters';
import FeaturedSection from './components/FeaturedSection';
import CategoryGrid from './components/CategoryGrid';
import PopularResources from './components/PopularResources';
import CommunityContent from './components/CommunityContent';
import ResourceCard from './components/ResourceCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EducationalResources = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [filteredResources, setFilteredResources] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  // Mock data for educational resources
  const mockResources = [
    {
      id: 1,
      title: "Identifying Cassava Mosaic Disease",
      description: "Learn to recognize the early signs of cassava mosaic disease and prevent its spread in your farm.",
      category: "disease-identification",
      difficulty: "beginner",
      readingTime: 8,
      rating: 4.8,
      views: 2340,
      type: "article",
      image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
      publishedDate: "2025-01-10",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Organic Pest Control Methods",
      description: "Effective natural methods to control pests without harmful chemicals using local materials.",
      category: "pest-control",
      difficulty: "intermediate",
      readingTime: 12,
      rating: 4.6,
      views: 1890,
      type: "video",
      duration: "15:30",
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg",
      publishedDate: "2025-01-08",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Seasonal Planting Calendar for Nigeria",
      description: "Complete guide to optimal planting times for major crops across different Nigerian regions.",
      category: "seasonal-tips",
      difficulty: "beginner",
      readingTime: 15,
      rating: 4.9,
      views: 3120,
      type: "article",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      publishedDate: "2025-01-05",
      isBookmarked: false
    },
    {
      id: 4,
      title: "Soil pH Management Techniques",
      description: "Understanding and managing soil pH levels for optimal crop growth and yield improvement.",
      category: "soil-management",
      difficulty: "advanced",
      readingTime: 20,
      rating: 4.7,
      views: 1560,
      type: "article",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
      publishedDate: "2025-01-03",
      isBookmarked: false
    },
    {
      id: 5,
      title: "Yam Disease Prevention Strategies",
      description: "Comprehensive prevention methods to protect yam crops from common diseases and infections.",
      category: "prevention",
      difficulty: "intermediate",
      readingTime: 10,
      rating: 4.5,
      views: 2100,
      type: "video",
      duration: "12:45",
      image: "https://images.pexels.com/photos/4503268/pexels-photo-4503268.jpeg",
      publishedDate: "2025-01-01",
      isBookmarked: true
    },
    {
      id: 6,
      title: "Maize Borer Treatment Guide",
      description: "Step-by-step treatment methods for maize borer infestations using integrated pest management.",
      category: "treatment",
      difficulty: "intermediate",
      readingTime: 14,
      rating: 4.4,
      views: 1780,
      type: "article",
      image: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg",
      publishedDate: "2024-12-28",
      isBookmarked: false
    }
  ];

  const mockFeaturedResources = [
    {
      id: 7,
      title: "Dry Season Farming Strategies for 2025",
      description: "Essential techniques for successful farming during the dry season with water conservation methods.",
      readingTime: 18,
      views: 4200,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      publishedDate: "Jan 12, 2025"
    },
    {
      id: 8,
      title: "Climate-Resilient Crop Varieties",
      description: "Discover drought-resistant and high-yield crop varieties suitable for Nigerian climate conditions.",
      readingTime: 22,
      views: 3800,
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
      publishedDate: "Jan 10, 2025"
    }
  ];

  const mockPopularResources = [
    {
      id: 9,
      title: "Complete Guide to Cassava Cultivation",
      description: "From planting to harvest - everything you need to know about successful cassava farming.",
      readingTime: 25,
      views: 5600,
      rating: 4.9,
      image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg"
    },
    {
      id: 10,
      title: "Natural Fertilizer Preparation",
      description: "Learn to make effective organic fertilizers using locally available materials.",
      readingTime: 12,
      views: 4800,
      rating: 4.7,
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg"
    },
    {
      id: 11,
      title: "Water Management for Small Farms",
      description: "Efficient irrigation and water conservation techniques for smallholder farmers.",
      readingTime: 16,
      views: 4200,
      rating: 4.6,
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg"
    }
  ];

  const mockCommunityResources = [
    {
      id: 12,
      title: "Traditional Pest Control Using Neem",
      content: "In my 20 years of farming, I've found that neem leaves mixed with soap water is the most effective natural pesticide. Here's how I prepare and use it...",
      author: {
        name: "Mallam Ibrahim Yusuf",
        location: "Kano State",
        experience: 20,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      tags: ["neem", "organic", "traditional"],
      likes: 156,
      comments: 23,
      publishedDate: "3 days ago",
      isVerified: true
    },
    {
      id: 13,
      title: "Intercropping Yam with Maize Success Story",
      content: "I increased my farm productivity by 40% using intercropping techniques. Let me share the exact spacing and timing methods that worked for me...",
      author: {
        name: "Mrs. Adunni Ogundimu",
        location: "Ogun State",
        experience: 15,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      tags: ["intercropping", "yam", "maize"],
      likes: 89,
      comments: 15,
      publishedDate: "1 week ago",
      isVerified: false
    }
  ];

  const mockCategories = [
    { id: 'disease-identification', name: 'Disease ID', resourceCount: 45 },
    { id: 'prevention', name: 'Prevention', resourceCount: 38 },
    { id: 'treatment', name: 'Treatment', resourceCount: 52 },
    { id: 'seasonal-tips', name: 'Seasonal Tips', resourceCount: 29 },
    { id: 'pest-control', name: 'Pest Control', resourceCount: 41 },
    { id: 'soil-management', name: 'Soil Care', resourceCount: 33 }
  ];

  const mockNotifications = [
    {
      message: "New educational content available for cassava disease prevention",
      time: "2 hours ago",
      read: false
    },
    {
      message: "Weekly farming tips newsletter is ready",
      time: "1 day ago",
      read: true
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
      setSelectedLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    let filtered = mockResources;

    if (searchTerm) {
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered?.filter(resource => resource?.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered?.filter(resource => resource?.difficulty === selectedDifficulty);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('cropcare-language', language);
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language } 
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBookmark = (resourceId, isBookmarked) => {
    if (isBookmarked) {
      setBookmarkedResources(prev => [...prev, resourceId]);
    } else {
      setBookmarkedResources(prev => prev?.filter(id => id !== resourceId));
    }
  };

  const handleViewResource = (resource) => {
    console.log('Viewing resource:', resource);
    // Navigate to resource detail view
  };

  const handleContribute = () => {
    console.log('Opening contribution modal');
    // Open contribution form
  };

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'ha': return 'Koyarwar Ilimi - CropCare AI';
      case 'yo': return 'Awọn Ohun Elo Eko - CropCare AI';
      case 'ig': return 'Ihe Omumu - CropCare AI';
      default: return 'Educational Resources - CropCare AI';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Access comprehensive educational resources about crop diseases, prevention strategies, and best farming practices for Nigerian farmers." />
      </Helmet>
      <GlobalHeader 
        userType="farmer" 
        notifications={mockNotifications}
        onMenuToggle={() => {}}
      />
      <FarmerTabNavigation />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-foreground">
                  Educational Resources
                </h1>
                <p className="text-text-secondary">
                  Learn about crop diseases, prevention, and best farming practices
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-heading font-heading-bold text-primary mb-1">238</div>
                <div className="text-sm text-text-secondary">Total Resources</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-heading font-heading-bold text-success mb-1">6</div>
                <div className="text-sm text-text-secondary">Categories</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-heading font-heading-bold text-accent mb-1">4</div>
                <div className="text-sm text-text-secondary">Languages</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-heading font-heading-bold text-secondary mb-1">
                  {bookmarkedResources?.length}
                </div>
                <div className="text-sm text-text-secondary">Bookmarked</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onDifficultyChange={handleDifficultyChange}
            onLanguageChange={handleLanguageChange}
          />

          {/* Featured Resources */}
          <FeaturedSection
            featuredResources={mockFeaturedResources}
            onViewResource={handleViewResource}
          />

          {/* Category Grid */}
          <CategoryGrid
            categories={mockCategories}
            onCategorySelect={handleCategorySelect}
          />

          {/* Popular Resources */}
          <PopularResources
            popularResources={mockPopularResources}
            onViewResource={handleViewResource}
          />

          {/* Community Content */}
          <CommunityContent
            communityResources={mockCommunityResources}
            onViewResource={handleViewResource}
            onContribute={handleContribute}
          />

          {/* All Resources Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Grid3X3" size={18} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-heading-bold text-foreground">All Resources</h2>
                  <p className="text-sm text-text-secondary">
                    {filteredResources?.length} resources found
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Filter">
                  Filter
                </Button>
                <Button variant="ghost" size="sm" iconName="ArrowUpDown">
                  Sort
                </Button>
              </div>
            </div>

            {filteredResources?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources?.map((resource) => (
                  <ResourceCard
                    key={resource?.id}
                    resource={resource}
                    onBookmark={handleBookmark}
                    onView={handleViewResource}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
                  No resources found
                </h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedDifficulty('');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredResources?.length > 0 && (
            <div className="text-center">
              <Button variant="outline" iconName="Plus" iconPosition="left">
                Load More Resources
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EducationalResources;