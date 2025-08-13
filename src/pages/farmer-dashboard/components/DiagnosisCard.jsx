import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiagnosisCard = ({ className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-agricultural-lg p-6 text-white shadow-agricultural-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-heading-bold mb-2">Diagnose Crop Disease</h2>
          <p className="text-white/90 font-body text-sm">
            Take a photo of your crop to get instant AI-powered diagnosis
          </p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-agricultural-md flex items-center justify-center">
          <Icon name="Camera" size={32} color="white" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} color="white" />
          <span className="text-sm font-caption text-white/90">Instant Results</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="white" />
          <span className="text-sm font-caption text-white/90">95% Accuracy</span>
        </div>
      </div>

      <Link to="/crop-disease-diagnosis">
        <Button 
          variant="secondary" 
          iconName="Camera" 
          iconPosition="left"
          className="w-full bg-white text-primary hover:bg-white/90"
        >
          Start Diagnosis
        </Button>
      </Link>
    </div>
  );
};

export default DiagnosisCard;