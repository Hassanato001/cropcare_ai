import React from 'react';
import Icon from '../../../components/AppIcon';

const CropTypeSelector = ({ selectedCrop, onCropSelect, className = '' }) => {
  const cropTypes = [
    {
      id: 'cassava',
      name: 'Cassava',
      icon: 'Leaf',
      description: 'Root vegetable crop',
      diseases: ['Cassava Mosaic Disease', 'Cassava Brown Streak', 'Bacterial Blight']
    },
    {
      id: 'yam',
      name: 'Yam',
      icon: 'TreePine',
      description: 'Tuber crop',
      diseases: ['Yam Mosaic Virus', 'Anthracnose', 'Dry Rot']
    },
    {
      id: 'maize',
      name: 'Maize',
      icon: 'Wheat',
      description: 'Cereal grain crop',
      diseases: ['Northern Corn Leaf Blight', 'Gray Leaf Spot', 'Common Rust']
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-heading-semibold text-foreground">
          Select Crop Type
        </h3>
        <div className="text-xs font-caption text-text-secondary bg-muted px-2 py-1 rounded-agricultural-sm">
          Required for accurate diagnosis
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cropTypes?.map((crop) => (
          <button
            key={crop?.id}
            onClick={() => onCropSelect(crop?.id)}
            className={`p-4 rounded-agricultural-lg border-2 transition-all text-left ${
              selectedCrop === crop?.id
                ? 'border-primary bg-primary/10 shadow-agricultural-md'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-agricultural-md flex items-center justify-center ${
                selectedCrop === crop?.id 
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary'
              }`}>
                <Icon name={crop?.icon} size={20} />
              </div>
              <div>
                <h4 className="text-sm font-heading font-heading-semibold text-foreground">
                  {crop?.name}
                </h4>
                <p className="text-xs font-caption text-text-secondary">
                  {crop?.description}
                </p>
              </div>
            </div>

            {/* Common diseases preview */}
            <div className="space-y-1">
              <p className="text-xs font-caption text-text-secondary font-medium">
                Common diseases:
              </p>
              <div className="flex flex-wrap gap-1">
                {crop?.diseases?.slice(0, 2)?.map((disease, index) => (
                  <span
                    key={index}
                    className="text-xs font-caption bg-muted px-2 py-0.5 rounded-agricultural-sm text-text-secondary"
                  >
                    {disease}
                  </span>
                ))}
                {crop?.diseases?.length > 2 && (
                  <span className="text-xs font-caption text-text-secondary">
                    +{crop?.diseases?.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Selection indicator */}
            {selectedCrop === crop?.id && (
              <div className="flex items-center justify-end mt-3">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Selected crop info */}
      {selectedCrop && (
        <div className="bg-success/10 border border-success/20 rounded-agricultural-md p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <p className="text-sm font-body text-success">
              {cropTypes?.find(c => c?.id === selectedCrop)?.name} selected for diagnosis
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropTypeSelector;