import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ImageAnalysisCard = ({ imageUrl, confidence, affectedAreas }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getConfidenceIcon = (score) => {
    if (score >= 90) return 'CheckCircle';
    if (score >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card rounded-agricultural-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">
            Image Analysis
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOverlay(!showOverlay)}
            iconName={showOverlay ? "EyeOff" : "Eye"}
            iconPosition="left"
            iconSize={16}
          >
            {showOverlay ? 'Hide' : 'Show'} Overlay
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-video bg-muted">
          <Image
            src={imageUrl}
            alt="Analyzed crop image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Affected Areas Overlay */}
        {showOverlay && (
          <div className="absolute inset-0 pointer-events-none">
            {affectedAreas?.map((area, index) => (
              <div
                key={index}
                className="absolute border-2 border-error bg-error/20 rounded-agricultural-sm"
                style={{
                  left: `${area?.x}%`,
                  top: `${area?.y}%`,
                  width: `${area?.width}%`,
                  height: `${area?.height}%`
                }}
              >
                <div className="absolute -top-6 left-0 bg-error text-error-foreground text-xs px-2 py-1 rounded-agricultural-sm font-mono">
                  {area?.severity}%
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confidence Score */}
        <div className="absolute top-4 right-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-agricultural-md backdrop-blur-agricultural ${getConfidenceColor(confidence)}`}>
            <Icon name={getConfidenceIcon(confidence)} size={16} />
            <span className="text-sm font-mono font-medium">{confidence}%</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-caption text-text-secondary">Image Quality</p>
            <p className="font-body text-card-foreground">High Resolution</p>
          </div>
          <div>
            <p className="font-caption text-text-secondary">Processing Time</p>
            <p className="font-body text-card-foreground">2.3 seconds</p>
          </div>
          <div>
            <p className="font-caption text-text-secondary">Affected Areas</p>
            <p className="font-body text-card-foreground">{affectedAreas?.length} detected</p>
          </div>
          <div>
            <p className="font-caption text-text-secondary">Model Version</p>
            <p className="font-body text-card-foreground">v2.1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisCard;