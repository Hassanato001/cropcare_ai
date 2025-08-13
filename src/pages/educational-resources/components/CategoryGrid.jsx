import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryGrid = ({ categories, onCategorySelect }) => {
  const getCategoryIcon = (category) => {
    switch (category?.id) {
      case 'disease-identification': return 'Search';
      case 'prevention': return 'Shield';
      case 'treatment': return 'Stethoscope';
      case 'seasonal-tips': return 'Calendar';
      case 'pest-control': return 'Bug';
      case 'soil-management': return 'Layers';
      default: return 'BookOpen';
    }
  };

  const getCategoryColor = (index) => {
    const colors = [
      'from-primary/20 to-primary/10',
      'from-secondary/20 to-secondary/10',
      'from-accent/20 to-accent/10',
      'from-success/20 to-success/10',
      'from-warning/20 to-warning/10',
      'from-error/20 to-error/10'
    ];
    return colors?.[index % colors?.length];
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Grid3X3" size={18} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-heading-bold text-foreground">Browse by Category</h2>
          <p className="text-sm text-text-secondary">Explore resources by topic</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories?.map((category, index) => (
          <button
            key={category?.id}
            onClick={() => handleCategoryClick(category?.id)}
            className={`bg-gradient-to-br ${getCategoryColor(index)} rounded-lg border border-border p-4 hover:shadow-agricultural-md transition-all duration-200 text-left group`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-background/80 rounded-lg flex items-center justify-center group-hover:bg-background transition-colors">
                <Icon
                  name={getCategoryIcon(category)}
                  size={24}
                  color="var(--color-primary)"
                />
              </div>
              <div className="text-center">
                <h3 className="font-heading font-heading-semibold text-foreground text-sm mb-1">
                  {category?.name}
                </h3>
                <p className="text-xs text-text-secondary">
                  {category?.resourceCount} resources
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;