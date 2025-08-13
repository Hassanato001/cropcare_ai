import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiagnosisDetailModal = ({ diagnosis, isOpen, onClose, className = '' }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !diagnosis) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getCropIcon = (cropType) => {
    switch (cropType?.toLowerCase()) {
      case 'cassava': return 'Leaf';
      case 'yam': return 'TreePine';
      case 'maize': return 'Wheat';
      default: return 'Sprout';
    }
  };

  const treatmentSteps = [
    {
      step: 1,
      title: "Initial Treatment",
      description: "Applied copper-based fungicide spray",
      date: "2025-01-10",
      status: "completed",
      notes: "Covered all affected leaves thoroughly"
    },
    {
      step: 2,
      title: "Follow-up Application",
      description: "Second round of treatment after 7 days",
      date: "2025-01-17",
      status: "completed",
      notes: "Noticed improvement in leaf condition"
    },
    {
      step: 3,
      title: "Monitoring Phase",
      description: "Weekly monitoring for disease progression",
      date: "2025-01-24",
      status: "in-progress",
      notes: "Continue monitoring for 2 more weeks"
    }
  ];

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'treatment', label: 'Treatment', icon: 'Stethoscope' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-agricultural-lg shadow-agricultural-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon 
              name={getCropIcon(diagnosis?.cropType)} 
              size={24} 
              color="var(--color-primary)" 
            />
            <div>
              <h2 className="text-xl font-heading font-heading-semibold text-foreground">
                {diagnosis?.cropType} Diagnosis
              </h2>
              <p className="text-sm font-caption text-text-secondary">
                {new Date(diagnosis.date)?.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-body transition-agricultural ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-heading-semibold text-foreground">Crop Image</h3>
                  <div className="aspect-square rounded-agricultural-md overflow-hidden bg-muted">
                    <Image
                      src={diagnosis?.image}
                      alt={`${diagnosis?.cropType} with ${diagnosis?.diseaseName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-heading-semibold text-foreground">Diagnosis Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-agricultural-sm">
                      <span className="text-sm font-body text-text-secondary">Disease</span>
                      <span className="text-sm font-body text-foreground font-medium">{diagnosis?.diseaseName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted rounded-agricultural-sm">
                      <span className="text-sm font-body text-text-secondary">Confidence</span>
                      <span className="text-sm font-mono text-primary font-medium">{diagnosis?.confidence}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted rounded-agricultural-sm">
                      <span className="text-sm font-body text-text-secondary">Status</span>
                      <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-caption ${getStatusColor(diagnosis?.treatmentStatus)}`}>
                        {diagnosis?.treatmentStatus === 'completed' ? 'Completed' : 
                         diagnosis?.treatmentStatus === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted rounded-agricultural-sm">
                      <span className="text-sm font-body text-text-secondary">Location</span>
                      <span className="text-sm font-body text-foreground">{diagnosis?.location}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-agricultural-md">
                    <h4 className="text-sm font-heading font-heading-medium text-foreground mb-2">Description</h4>
                    <p className="text-sm font-body text-text-secondary leading-relaxed">
                      {diagnosis?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'treatment' && (
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-heading font-heading-semibold text-foreground">Treatment Plan</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-agricultural-md">
                    <h4 className="text-sm font-heading font-heading-medium text-success mb-2">Recommended Treatment</h4>
                    <p className="text-sm font-body text-text-secondary">
                      Apply copper-based fungicide every 7-10 days. Remove affected leaves and improve air circulation around plants.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-warning/10 rounded-agricultural-md">
                    <h4 className="text-sm font-heading font-heading-medium text-warning mb-2">Prevention Tips</h4>
                    <ul className="text-sm font-body text-text-secondary space-y-1">
                      <li>• Avoid overhead watering</li>
                      <li>• Ensure proper plant spacing</li>
                      <li>• Remove plant debris regularly</li>
                      <li>• Use disease-resistant varieties</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-heading font-heading-medium text-foreground">Progress Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-text-secondary">Overall Progress</span>
                      <span className="text-sm font-mono text-primary">{diagnosis?.treatmentProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${diagnosis?.treatmentProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-agricultural-md">
                    <h5 className="text-sm font-heading font-heading-medium text-foreground mb-2">Next Steps</h5>
                    <p className="text-sm font-body text-text-secondary">
                      Continue monitoring for 2 more weeks. If symptoms persist, consider alternative treatment options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="p-6">
              <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-6">Treatment Timeline</h3>
              
              <div className="space-y-4">
                {treatmentSteps?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                      step?.status === 'completed' ? 'bg-success text-success-foreground' :
                      step?.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-text-secondary'
                    }`}>
                      {step?.status === 'completed' ? (
                        <Icon name="Check" size={14} />
                      ) : (
                        step?.step
                      )}
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-heading font-heading-medium text-foreground">{step?.title}</h4>
                        <span className="text-xs font-caption text-text-secondary">
                          {new Date(step.date)?.toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <p className="text-sm font-body text-text-secondary mb-2">{step?.description}</p>
                      {step?.notes && (
                        <p className="text-xs font-caption text-text-secondary italic">{step?.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Calendar" size={16} />
            <span className="text-sm font-caption">
              Last updated: {new Date()?.toLocaleDateString('en-GB')}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Share" iconPosition="left">
              Share
            </Button>
            <Button variant="default" iconName="Download" iconPosition="left">
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDetailModal;