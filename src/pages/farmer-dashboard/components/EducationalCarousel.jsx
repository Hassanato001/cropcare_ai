import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EducationalCarousel = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const educationalContent = [
    {
      id: 1,
      title: "Identifying Early Signs of Cassava Mosaic Disease",
      description: "Learn to spot the characteristic yellow mosaic patterns on cassava leaves before the disease spreads.",
      image: "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg",
      category: "Disease Prevention",
      readTime: "5 min read",
      isNew: true
    },
    {
      id: 2,
      title: "Organic Pest Control for Maize Crops",
      description: "Natural methods to protect your maize from common pests without harmful chemicals.",
      image: "https://images.pixabay.com/photo/2016/08/25/20/18/corn-1620363_1280.jpg",
      category: "Pest Management",
      readTime: "7 min read",
      isNew: false
    },
    {
      id: 3,
      title: "Proper Yam Storage Techniques",
      description: "Maximize your yam harvest value with proper post-harvest storage and handling methods.",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      category: "Post-Harvest",
      readTime: "4 min read",
      isNew: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % educationalContent?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + educationalContent?.length) % educationalContent?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentContent = educationalContent?.[currentSlide];

  return (
    <div className={`bg-card rounded-agricultural-lg border border-border shadow-agricultural-sm overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">Featured Learning</h3>
        <Link 
          to="/educational-resources"
          className="text-sm font-body text-primary hover:text-primary/80 transition-agricultural"
        >
          View All
        </Link>
      </div>
      <div className="relative">
        {/* Main Content */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={currentContent?.image}
            alt={currentContent?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-primary rounded-agricultural-sm text-xs font-caption">
                {currentContent?.category}
              </span>
              {currentContent?.isNew && (
                <span className="px-2 py-1 bg-accent rounded-agricultural-sm text-xs font-caption">
                  New
                </span>
              )}
            </div>
            <h4 className="text-sm font-body font-medium mb-1 line-clamp-2">
              {currentContent?.title}
            </h4>
            <p className="text-xs font-caption text-white/90 line-clamp-2 mb-2">
              {currentContent?.description}
            </p>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={12} color="white" />
              <span className="text-xs font-caption">{currentContent?.readTime}</span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-2 right-2 flex items-center justify-between transform -translate-y-1/2 pointer-events-none">
          <button
            onClick={prevSlide}
            className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-agricultural pointer-events-auto"
            disabled={educationalContent?.length <= 1}
          >
            <Icon name="ChevronLeft" size={16} color="white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-agricultural pointer-events-auto"
            disabled={educationalContent?.length <= 1}
          >
            <Icon name="ChevronRight" size={16} color="white" />
          </button>
        </div>
      </div>
      {/* Slide Indicators */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-muted">
        {educationalContent?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-agricultural ${
              index === currentSlide ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
      {/* Action Button */}
      <div className="p-4 border-t border-border">
        <Link to="/educational-resources">
          <Button variant="outline" iconName="BookOpen" iconPosition="left" className="w-full">
            Explore All Resources
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EducationalCarousel;