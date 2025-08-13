import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DiseaseIdentificationCard = ({ disease }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getSeverityColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-error bg-error/10 border-error/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getSeverityIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'CheckCircle';
      case 'moderate': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getLocalizedContent = () => {
    return disease?.localizations?.[currentLanguage] || disease?.localizations?.en;
  };

  const localizedContent = getLocalizedContent();

  return (
    <div className="bg-card rounded-agricultural-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">
            Disease Identification
          </h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-agricultural-md border ${getSeverityColor(disease?.severity)}`}>
            <Icon name={getSeverityIcon(disease?.severity)} size={14} />
            <span className="text-sm font-caption font-medium">{disease?.severity} Severity</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Disease Names */}
        <div>
          <h4 className="text-xl font-heading font-heading-bold text-card-foreground mb-2">
            {localizedContent?.commonName}
          </h4>
          <p className="text-sm font-mono text-text-secondary italic">
            {disease?.scientificName}
          </p>
          {currentLanguage !== 'en' && (
            <p className="text-sm font-body text-text-secondary mt-1">
              English: {disease?.localizations?.en?.commonName}
            </p>
          )}
        </div>

        {/* Disease Description */}
        <div>
          <p className="text-sm font-body text-card-foreground leading-relaxed">
            {localizedContent?.description}
          </p>
        </div>

        {/* Reference Images */}
        <div>
          <h5 className="text-sm font-heading font-heading-semibold text-card-foreground mb-3">
            Reference Images
          </h5>
          <div className="grid grid-cols-3 gap-3">
            {disease?.referenceImages?.map((image, index) => (
              <div key={index} className="aspect-square bg-muted rounded-agricultural-md overflow-hidden">
                <Image
                  src={image?.url}
                  alt={`${localizedContent?.commonName} reference ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Disease Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs font-caption text-text-secondary uppercase tracking-wide">
              Crop Type
            </p>
            <p className="text-sm font-body text-card-foreground font-medium">
              {localizedContent?.cropType}
            </p>
          </div>
          <div>
            <p className="text-xs font-caption text-text-secondary uppercase tracking-wide">
              Season Risk
            </p>
            <p className="text-sm font-body text-card-foreground font-medium">
              {localizedContent?.seasonRisk}
            </p>
          </div>
          <div>
            <p className="text-xs font-caption text-text-secondary uppercase tracking-wide">
              Spread Rate
            </p>
            <p className="text-sm font-body text-card-foreground font-medium">
              {disease?.spreadRate}
            </p>
          </div>
          <div>
            <p className="text-xs font-caption text-text-secondary uppercase tracking-wide">
              Economic Impact
            </p>
            <p className="text-sm font-body text-card-foreground font-medium">
              {disease?.economicImpact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseIdentificationCard;