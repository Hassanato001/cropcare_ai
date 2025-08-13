import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImagePreprocessing = ({ image, onProcessingComplete, selectedCropType }) => {
  const [processingStage, setProcessingStage] = useState('analyzing');
  const [imageQuality, setImageQuality] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  const processingStages = [
    { id: 'analyzing', label: 'Analyzing image quality...', duration: 1500 },
    { id: 'enhancing', label: 'Enhancing image clarity...', duration: 2000 },
    { id: 'detecting', label: 'Detecting plant features...', duration: 2500 },
    { id: 'preparing', label: 'Preparing for AI analysis...', duration: 1000 }
  ];

  const qualityChecks = [
    { id: 'lighting', label: 'Lighting Conditions', status: 'good' },
    { id: 'focus', label: 'Image Focus', status: 'excellent' },
    { id: 'resolution', label: 'Image Resolution', status: 'good' },
    { id: 'plant_visibility', label: 'Plant Visibility', status: 'excellent' }
  ];

  useEffect(() => {
    if (image) {
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e?.target?.result);
      reader?.readAsDataURL(image);

      // Simulate processing stages
      let currentStageIndex = 0;
      let progress = 0;

      const processStage = () => {
        if (currentStageIndex < processingStages?.length) {
          const stage = processingStages?.[currentStageIndex];
          setProcessingStage(stage?.id);

          const stageProgress = 100 / processingStages?.length;
          const startProgress = currentStageIndex * stageProgress;

          const progressInterval = setInterval(() => {
            progress += 2;
            const currentProgress = Math.min(startProgress + (progress * stageProgress / 100), (currentStageIndex + 1) * stageProgress);
            setProcessingProgress(currentProgress);

            if (progress >= 100) {
              clearInterval(progressInterval);
              progress = 0;
              currentStageIndex++;
              
              if (currentStageIndex < processingStages?.length) {
                setTimeout(processStage, 200);
              } else {
                // Processing complete
                setImageQuality({
                  overall: 'excellent',
                  score: 92,
                  checks: qualityChecks
                });
                setTimeout(() => {
                  onProcessingComplete({
                    image,
                    quality: { overall: 'excellent', score: 92 },
                    preprocessed: true
                  });
                }, 1000);
              }
            }
          }, 50);
        }
      };

      processStage();
    }
  }, [image, onProcessingComplete]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-accent';
      case 'poor': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle2';
      case 'good': return 'CheckCircle';
      case 'poor': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      default: return 'Clock';
    }
  };

  const getCurrentStage = () => {
    return processingStages?.find(stage => stage?.id === processingStage);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
          Processing Your Image
        </h2>
        <p className="text-sm font-body text-text-secondary">
          Analyzing {selectedCropType} image for optimal AI diagnosis
        </p>
      </div>
      {/* Image Preview */}
      {imagePreview && (
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-agricultural-lg overflow-hidden border-2 border-border">
            <Image 
              src={imagePreview} 
              alt="Uploaded crop image" 
              className="w-full h-full object-cover"
            />
            {processingProgress < 100 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3" />
                  <p className="text-white text-sm font-caption">Processing...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-body text-foreground">
            {getCurrentStage()?.label || 'Processing...'}
          </p>
          <span className="text-sm font-mono text-text-secondary">
            {Math.round(processingProgress)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${processingProgress}%` }}
          />
        </div>
      </div>
      {/* Processing Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {processingStages?.map((stage, index) => {
          const isActive = stage?.id === processingStage;
          const isCompleted = processingStages?.findIndex(s => s?.id === processingStage) > index;
          
          return (
            <div
              key={stage?.id}
              className={`p-3 rounded-agricultural-md border text-center transition-all ${
                isActive 
                  ? 'border-primary bg-primary/10' 
                  : isCompleted 
                    ? 'border-success bg-success/10' :'border-border bg-muted'
              }`}
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                isActive 
                  ? 'bg-primary text-white' 
                  : isCompleted 
                    ? 'bg-success text-white' :'bg-muted text-text-secondary'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : isActive ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="text-xs font-mono">{index + 1}</span>
                )}
              </div>
              <p className="text-xs font-caption text-text-secondary">
                {stage?.label?.split(' ')?.[0]}
              </p>
            </div>
          );
        })}
      </div>
      {/* Quality Assessment */}
      {imageQuality && (
        <div className="bg-card border border-border rounded-agricultural-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-heading-semibold text-foreground">
              Image Quality Assessment
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                imageQuality?.score >= 80 ? 'bg-success' : 
                imageQuality?.score >= 60 ? 'bg-accent' : 'bg-warning'
              }`} />
              <span className="text-sm font-mono text-foreground">
                {imageQuality?.score}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {imageQuality?.checks?.map((check) => (
              <div key={check?.id} className="flex items-center justify-between p-2 bg-muted rounded-agricultural-md">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(check?.status)} 
                    size={16} 
                    className={getStatusColor(check?.status)}
                  />
                  <span className="text-sm font-body text-foreground">
                    {check?.label}
                  </span>
                </div>
                <span className={`text-xs font-caption capitalize ${getStatusColor(check?.status)}`}>
                  {check?.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Educational Tip */}
      <div className="bg-accent/10 border border-accent/20 rounded-agricultural-md p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-heading font-heading-semibold text-foreground mb-1">
              Did you know?
            </h4>
            <p className="text-sm font-body text-text-secondary">
              Early detection of crop diseases can increase yield by up to 40%. 
              Regular monitoring helps prevent disease spread to neighboring plants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreprocessing;