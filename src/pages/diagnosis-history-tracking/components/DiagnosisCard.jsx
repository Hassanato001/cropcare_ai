import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DiagnosisCard = ({ diagnosis, onClick, className = '' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success bg-success/10';
    if (confidence >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getCropIcon = (cropType) => {
    switch (cropType?.toLowerCase()) {
      case 'cassava': return 'Leaf';
      case 'yam': return 'TreePine';
      case 'maize': return 'Wheat';
      default: return 'Sprout';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-agricultural-md p-4 hover:shadow-agricultural-md transition-agricultural cursor-pointer ${className}`}
      onClick={() => onClick(diagnosis)}
    >
      <div className="flex items-start space-x-4">
        {/* Crop Image */}
        <div className="w-16 h-16 rounded-agricultural-sm overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={diagnosis?.image}
            alt={`${diagnosis?.cropType} diagnosis`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getCropIcon(diagnosis?.cropType)} 
                size={16} 
                color="var(--color-primary)" 
              />
              <h3 className="text-sm font-heading font-heading-semibold text-card-foreground truncate">
                {diagnosis?.cropType}
              </h3>
            </div>
            <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-mono ${getConfidenceColor(diagnosis?.confidence)}`}>
              {diagnosis?.confidence}%
            </span>
          </div>

          <p className="text-sm font-body text-text-secondary mb-2 line-clamp-2">
            {diagnosis?.diseaseName}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} color="var(--color-text-secondary)" />
              <span className="text-xs font-caption text-text-secondary">
                {new Date(diagnosis.date)?.toLocaleDateString('en-GB')}
              </span>
            </div>
            <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-caption ${getStatusColor(diagnosis?.treatmentStatus)}`}>
              {diagnosis?.treatmentStatus === 'completed' ? 'Completed' : 
               diagnosis?.treatmentStatus === 'in-progress' ? 'In Progress' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
      {/* Treatment Progress */}
      {diagnosis?.treatmentStatus === 'in-progress' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-caption text-text-secondary">Treatment Progress</span>
            <span className="text-xs font-mono text-text-secondary">{diagnosis?.treatmentProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{ width: `${diagnosis?.treatmentProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisCard;