import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularResources = ({ popularResources, onViewResource }) => {
  const handleViewResource = (resource) => {
    onViewResource(resource);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-heading-bold text-foreground">Popular Resources</h2>
            <p className="text-sm text-text-secondary">Most accessed by local farming community</p>
          </div>
        </div>
        <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {popularResources?.map((resource, index) => (
          <div key={resource?.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-agricultural-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-heading font-heading-bold">
                  #{index + 1}
                </div>
              </div>
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={resource?.image}
                  alt={resource?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-heading-semibold text-foreground mb-1 line-clamp-1">
                  {resource?.title}
                </h3>
                <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                  {resource?.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{resource?.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>{resource?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{resource?.readingTime} min</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewResource(resource)}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularResources;