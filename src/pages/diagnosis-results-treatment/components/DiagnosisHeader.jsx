import React from 'react';

import Button from '../../../components/ui/Button';

const DiagnosisHeader = ({ onShare, onSave, onBack }) => {
  return (
    <div className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            iconName="ArrowLeft"
            iconSize={20}
            className="lg:hidden"
          />
          <div>
            <h1 className="text-lg font-heading font-heading-bold text-foreground">
              Diagnosis Results
            </h1>
            <p className="text-sm font-caption text-text-secondary">
              Analysis completed • {new Date()?.toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
            className="hidden sm:flex"
          >
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHeader;