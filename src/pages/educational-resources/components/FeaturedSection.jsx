import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ featuredResources, onViewResource }) => {
  const handleViewResource = (resource) => {
    onViewResource(resource);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Star" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-heading-bold text-foreground">Featured Resources</h2>
            <p className="text-sm text-text-secondary">Timely content for current season</p>
          </div>
        </div>
        <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredResources?.map((resource, index) => (
          <div key={resource?.id} className={`bg-gradient-to-r ${index === 0 ? 'from-primary/10 to-accent/10' : 'from-secondary/10 to-primary/10'} rounded-lg border border-border overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={resource?.image}
                      alt={resource?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-caption">
                      Featured
                    </span>
                    <span className="text-xs text-text-secondary">
                      {resource?.publishedDate}
                    </span>
                  </div>
                  <h3 className="font-heading font-heading-semibold text-foreground mb-2 line-clamp-2">
                    {resource?.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {resource?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{resource?.readingTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{resource?.views} views</span>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewResource(resource)}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Read Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;