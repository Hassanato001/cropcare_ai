import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentRecommendations = ({ treatments }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('immediate');
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const tabs = [
    { id: 'immediate', label: 'Immediate Actions', icon: 'Zap' },
    { id: 'organic', label: 'Organic Solutions', icon: 'Leaf' },
    { id: 'chemical', label: 'Chemical Treatments', icon: 'Flask' },
    { id: 'preventive', label: 'Prevention', icon: 'Shield' }
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev?.[itemId]
    }));
  };

  const getCostColor = (cost) => {
    if (cost <= 1000) return 'text-success';
    if (cost <= 5000) return 'text-warning';
    return 'text-error';
  };

  const getLocalizedTreatment = (treatment) => {
    return treatment?.localizations?.[currentLanguage] || treatment?.localizations?.en;
  };

  const renderTreatmentItem = (treatment, index) => {
    const localizedTreatment = getLocalizedTreatment(treatment);
    const isExpanded = expandedItems?.[`${activeTab}-${index}`];

    return (
      <div key={index} className="border border-border rounded-agricultural-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h5 className="text-base font-heading font-heading-semibold text-card-foreground mb-2">
                {localizedTreatment?.title}
              </h5>
              <p className="text-sm font-body text-text-secondary mb-3">
                {localizedTreatment?.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} color="var(--color-text-secondary)" />
                  <span className="font-caption text-text-secondary">
                    {treatment?.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={14} color="var(--color-text-secondary)" />
                  <span className={`font-mono font-medium ${getCostColor(treatment?.cost)}`}>
                    ₦{treatment?.cost?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                  <span className="font-caption text-success">
                    {treatment?.successRate}% success
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(`${activeTab}-${index}`)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            />
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border space-y-4">
              {/* Application Method */}
              <div>
                <h6 className="text-sm font-heading font-heading-semibold text-card-foreground mb-2">
                  Application Method
                </h6>
                <div className="space-y-2">
                  {localizedTreatment?.applicationSteps?.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-mono">
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm font-body text-card-foreground flex-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials Needed */}
              {treatment?.materials && (
                <div>
                  <h6 className="text-sm font-heading font-heading-semibold text-card-foreground mb-2">
                    Materials Needed
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {treatment?.materials?.map((material, materialIndex) => (
                      <div key={materialIndex} className="flex items-center space-x-2 p-2 bg-muted rounded-agricultural-sm">
                        <Icon name="Package" size={14} color="var(--color-text-secondary)" />
                        <span className="text-sm font-body text-card-foreground">
                          {material}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Precautions */}
              {treatment?.safetyPrecautions && (
                <div>
                  <h6 className="text-sm font-heading font-heading-semibold text-card-foreground mb-2 flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                    <span>Safety Precautions</span>
                  </h6>
                  <div className="bg-warning/10 border border-warning/20 rounded-agricultural-md p-3">
                    <ul className="space-y-1">
                      {treatment?.safetyPrecautions?.map((precaution, precautionIndex) => (
                        <li key={precautionIndex} className="text-sm font-body text-card-foreground flex items-start space-x-2">
                          <Icon name="Dot" size={12} color="var(--color-warning)" className="mt-1" />
                          <span>{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-agricultural-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">
          Treatment Recommendations
        </h3>
        <p className="text-sm font-caption text-text-secondary mt-1">
          Choose the most suitable treatment approach for your situation
        </p>
      </div>
      {/* Treatment Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-body whitespace-nowrap border-b-2 transition-agricultural ${
                activeTab === tab?.id
                  ? 'text-primary border-primary bg-primary/5' :'text-text-secondary border-transparent hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Treatment Content */}
      <div className="p-4">
        <div className="space-y-4">
          {treatments?.[activeTab]?.map((treatment, index) => 
            renderTreatmentItem(treatment, index)
          )}
        </div>

        {(!treatments?.[activeTab] || treatments?.[activeTab]?.length === 0) && (
          <div className="text-center py-8">
            <Icon name="Info" size={24} color="var(--color-text-secondary)" className="mx-auto mb-2" />
            <p className="text-sm font-body text-text-secondary">
              No {tabs?.find(t => t?.id === activeTab)?.label?.toLowerCase()} available for this disease
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentRecommendations;