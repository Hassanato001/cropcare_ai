import React from 'react';
import Icon from '../../../components/AppIcon';

const CropCalendar = ({ className = '' }) => {
  const currentMonth = new Date()?.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = new Date()?.getFullYear();

  const seasonalRecommendations = [
    {
      crop: "Cassava",
      action: "Planting Season",
      period: "January - March",
      icon: "Sprout",
      status: "active",
      description: "Optimal time for cassava planting in Northern Nigeria"
    },
    {
      crop: "Maize",
      action: "Land Preparation",
      period: "February - March",
      icon: "Tractor",
      status: "upcoming",
      description: "Prepare fields for early maize planting"
    },
    {
      crop: "Yam",
      action: "Harvesting",
      period: "December - February",
      icon: "Package",
      status: "active",
      description: "Late yam varieties ready for harvest"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'upcoming': return 'text-warning bg-warning/10 border-warning/20';
      case 'completed': return 'text-text-secondary bg-muted border-border';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'upcoming': return 'Clock';
      case 'completed': return 'Check';
      default: return 'Calendar';
    }
  };

  return (
    <div className={`bg-card rounded-agricultural-lg p-4 border border-border shadow-agricultural-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">Crop Calendar</h3>
          <p className="text-sm font-caption text-text-secondary">{currentMonth} {currentYear}</p>
        </div>
        <Icon name="Calendar" size={24} color="var(--color-primary)" />
      </div>
      <div className="space-y-3">
        {seasonalRecommendations?.map((recommendation, index) => (
          <div
            key={index}
            className={`p-3 rounded-agricultural-md border ${getStatusColor(recommendation?.status)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-agricultural-sm bg-background flex items-center justify-center flex-shrink-0">
                <Icon name={recommendation?.icon} size={18} color="var(--color-primary)" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-body font-medium text-card-foreground">
                    {recommendation?.crop} - {recommendation?.action}
                  </h4>
                  <Icon name={getStatusIcon(recommendation?.status)} size={14} color="currentColor" />
                </div>
                
                <p className="text-xs font-caption text-text-secondary mb-2">
                  {recommendation?.period}
                </p>
                
                <p className="text-xs font-caption text-text-secondary">
                  {recommendation?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted rounded-agricultural-md">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
          <span className="text-sm font-body font-medium text-card-foreground">Seasonal Tip</span>
        </div>
        <p className="text-xs font-caption text-text-secondary">
          Monitor weather patterns closely during planting season. Heavy rains can delay field preparation and affect seed germination.
        </p>
      </div>
    </div>
  );
};

export default CropCalendar;