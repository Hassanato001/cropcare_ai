import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, onView }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'disease-identification': return 'Search';
      case 'prevention': return 'Shield';
      case 'treatment': return 'Stethoscope';
      case 'seasonal-tips': return 'Calendar';
      case 'pest-control': return 'Bug';
      case 'soil-management': return 'Layers';
      default: return 'BookOpen';
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(resource?.id, !isBookmarked);
  };

  const handleView = () => {
    onView(resource);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-agricultural-md transition-all duration-200">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={resource?.image}
          alt={resource?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleBookmark}
            className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <Icon
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              size={16}
              color={isBookmarked ? "var(--color-accent)" : "var(--color-text-secondary)"}
            />
          </button>
        </div>
        {resource?.type === 'video' && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded text-xs">
              <Icon name="Play" size={12} />
              <span>{resource?.duration}</span>
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Category and Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon
              name={getCategoryIcon(resource?.category)}
              size={14}
              color="var(--color-primary)"
            />
            <span className="text-xs font-caption text-primary capitalize">
              {resource?.category?.replace('-', ' ')}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-caption capitalize ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-heading-semibold text-foreground mb-2 line-clamp-2">
          {resource?.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {resource?.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{resource?.readingTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>{resource?.rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>{resource?.views} views</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleView}
          iconName={resource?.type === 'video' ? 'Play' : 'BookOpen'}
          iconPosition="left"
        >
          {resource?.type === 'video' ? 'Watch Video' : 'Read Article'}
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;