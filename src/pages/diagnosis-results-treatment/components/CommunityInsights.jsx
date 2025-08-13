import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityInsights = ({ insights }) => {
  const [showAll, setShowAll] = useState(false);

  const getSuccessColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  const getDistanceText = (distance) => {
    if (distance < 1) return `${(distance * 1000)?.toFixed(0)}m away`;
    return `${distance?.toFixed(1)}km away`;
  };

  const displayedInsights = showAll ? insights : insights?.slice(0, 3);

  return (
    <div className="bg-card rounded-agricultural-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">
              Community Insights
            </h3>
            <p className="text-sm font-caption text-text-secondary mt-1">
              Similar cases from nearby farmers
            </p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-agricultural-md">
            <Icon name="Users" size={16} color="var(--color-accent)" />
            <span className="text-sm font-mono text-accent font-medium">
              {insights?.length} cases
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {displayedInsights?.map((insight, index) => (
          <div key={index} className="border border-border rounded-agricultural-md p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-heading font-heading-semibold text-card-foreground">
                      {insight?.farmerName}
                    </h5>
                    <div className="flex items-center space-x-3 text-xs font-caption text-text-secondary mt-1">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{insight?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Navigation" size={12} />
                        <span>{getDistanceText(insight?.distance)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{insight?.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-mono font-medium ${getSuccessColor(insight?.successRate)}`}>
                      {insight?.successRate}% success
                    </div>
                    <div className="text-xs font-caption text-text-secondary">
                      {insight?.treatmentUsed}
                    </div>
                  </div>
                </div>

                <p className="text-sm font-body text-card-foreground">
                  "{insight?.experience}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="Leaf" size={12} color="var(--color-success)" />
                      <span className="font-caption text-text-secondary">
                        {insight?.cropType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={12} color="var(--color-text-secondary)" />
                      <span className="font-mono text-text-secondary">
                        ₦{insight?.treatmentCost?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
                      <span className="font-caption text-text-secondary">
                        {insight?.treatmentDuration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageCircle"
                      iconSize={14}
                      className="text-xs"
                    >
                      Contact
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Icon name="ThumbsUp" size={12} color="var(--color-success)" />
                      <span className="text-xs font-mono text-success">
                        {insight?.helpfulVotes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {insights?.length > 3 && (
          <div className="text-center pt-2">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              iconName={showAll ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={16}
            >
              {showAll ? 'Show Less' : `Show ${insights?.length - 3} More Cases`}
            </Button>
          </div>
        )}

        {insights?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={24} color="var(--color-text-secondary)" className="mx-auto mb-2" />
            <p className="text-sm font-body text-text-secondary">
              No similar cases found in your area yet
            </p>
            <p className="text-xs font-caption text-text-secondary mt-1">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityInsights;