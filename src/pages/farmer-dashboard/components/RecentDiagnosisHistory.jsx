import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentDiagnosisHistory = ({ className = '' }) => {
  const recentDiagnoses = [
    {
      id: 1,
      cropType: "Cassava",
      disease: "Cassava Mosaic Disease",
      confidence: 94,
      date: "2025-01-13",
      time: "14:30",
      image: "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg",
      severity: "High",
      status: "Treatment Applied"
    },
    {
      id: 2,
      cropType: "Maize",
      disease: "Northern Corn Leaf Blight",
      confidence: 87,
      date: "2025-01-12",
      time: "09:15",
      image: "https://images.pixabay.com/photo/2016/08/25/20/18/corn-1620363_1280.jpg",
      severity: "Medium",
      status: "Monitoring"
    },
    {
      id: 3,
      cropType: "Yam",
      disease: "Healthy",
      confidence: 98,
      date: "2025-01-11",
      time: "16:45",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      severity: "None",
      status: "Healthy"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-accent bg-accent/10';
      case 'none': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'treatment applied': return 'CheckCircle';
      case 'monitoring': return 'Eye';
      case 'healthy': return 'Heart';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className={`bg-card rounded-agricultural-lg p-4 border border-border shadow-agricultural-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">Recent Diagnoses</h3>
        <Link 
          to="/diagnosis-history-tracking"
          className="text-sm font-body text-primary hover:text-primary/80 transition-agricultural"
        >
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {recentDiagnoses?.map((diagnosis) => (
          <Link
            key={diagnosis?.id}
            to="/diagnosis-results-treatment"
            className="block p-3 rounded-agricultural-md border border-border hover:bg-muted transition-agricultural"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-agricultural-sm overflow-hidden flex-shrink-0">
                <Image
                  src={diagnosis?.image}
                  alt={`${diagnosis?.cropType} diagnosis`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-body font-medium text-card-foreground truncate">
                    {diagnosis?.cropType}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-agricultural-sm text-xs font-caption ${getSeverityColor(diagnosis?.severity)}`}>
                    {diagnosis?.severity}
                  </span>
                </div>
                
                <p className="text-sm font-body text-text-secondary truncate mb-1">
                  {diagnosis?.disease}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={getStatusIcon(diagnosis?.status)} size={14} color="var(--color-text-secondary)" />
                    <span className="text-xs font-caption text-text-secondary">{diagnosis?.status}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} color="var(--color-text-secondary)" />
                    <span className="text-xs font-caption text-text-secondary">
                      {new Date(diagnosis.date)?.toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-xs font-mono text-text-secondary">{diagnosis?.confidence}%</span>
                <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {recentDiagnoses?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Camera" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3 opacity-50" />
          <p className="text-sm font-body text-text-secondary mb-2">No diagnoses yet</p>
          <p className="text-xs font-caption text-text-secondary">
            Start by taking a photo of your crops
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentDiagnosisHistory;