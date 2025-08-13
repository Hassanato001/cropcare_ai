import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityContent = ({ communityResources, onViewResource, onContribute }) => {
  const [showContributeModal, setShowContributeModal] = useState(false);

  const handleViewResource = (resource) => {
    onViewResource(resource);
  };

  const handleContribute = () => {
    setShowContributeModal(true);
    onContribute();
  };

  const getVerificationBadge = (isVerified) => {
    if (isVerified) {
      return (
        <div className="flex items-center space-x-1 text-success">
          <Icon name="CheckCircle" size={14} />
          <span className="text-xs font-caption">Expert Verified</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 text-warning">
        <Icon name="Clock" size={14} />
        <span className="text-xs font-caption">Under Review</span>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-heading-bold text-foreground">Community Knowledge</h2>
            <p className="text-sm text-text-secondary">Shared experiences from local farmers</p>
          </div>
        </div>
        <Button 
          variant="default" 
          onClick={handleContribute}
          iconName="Plus" 
          iconPosition="left"
        >
          Contribute
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communityResources?.map((resource) => (
          <div key={resource?.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-agricultural-md transition-all duration-200">
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={resource?.author?.avatar}
                      alt={resource?.author?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-heading-semibold text-foreground text-sm">
                      {resource?.author?.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {resource?.author?.location} • {resource?.author?.experience} years farming
                    </p>
                  </div>
                </div>
                {getVerificationBadge(resource?.isVerified)}
              </div>

              {/* Content */}
              <h3 className="font-heading font-heading-semibold text-foreground mb-2 line-clamp-2">
                {resource?.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                {resource?.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {resource?.tags?.map((tag, index) => (
                  <span key={index} className="bg-muted text-text-secondary px-2 py-1 rounded-full text-xs font-caption">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={12} />
                    <span>{resource?.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={12} />
                    <span>{resource?.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{resource?.publishedDate}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewResource(resource)}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border p-6 text-center">
        <Icon name="Lightbulb" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
        <h3 className="font-heading font-heading-bold text-foreground mb-2">Share Your Knowledge</h3>
        <p className="text-sm text-text-secondary mb-4">
          Help fellow farmers by sharing your experiences, traditional remedies, and local farming wisdom.
        </p>
        <Button variant="default" onClick={handleContribute} iconName="Plus" iconPosition="left">
          Contribute Your Knowledge
        </Button>
      </div>
    </div>
  );
};

export default CommunityContent;