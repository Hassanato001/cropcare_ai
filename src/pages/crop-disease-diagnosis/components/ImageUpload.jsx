import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageUpload = ({ onImageUpload, selectedCropType, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes?.includes(file?.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)";
    }

    if (file?.size > maxSize) {
      return "Image size must be less than 10MB";
    }

    return null;
  };

  const handleFiles = useCallback((files) => {
    setUploadError(null);
    const file = files?.[0];
    
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      setUploadError(error);
      return;
    }

    onImageUpload(file);
  }, [onImageUpload]);

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  }, [handleFiles]);

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl, file); // Pass both URL and File object
    }
  };

  const openFileDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleFileInput;
    input?.click();
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-agricultural-lg p-8 transition-all ${
          dragActive 
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-primary/5'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            dragActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          }`}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
              Upload Crop Image
            </h3>
            <p className="text-sm font-body text-text-secondary mb-4">
              Drag and drop your image here, or click to browse
            </p>
            
            <Button 
              variant="outline" 
              onClick={openFileDialog}
              disabled={isProcessing}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Choose File
            </Button>
          </div>
        </div>

        {/* File format info */}
        <div className="absolute bottom-2 right-2 text-xs font-caption text-text-secondary">
          JPEG, PNG, WebP • Max 10MB
        </div>
      </div>
      {/* Upload Error */}
      {uploadError && (
        <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-agricultural-md">
          <Icon name="AlertCircle" size={16} color="var(--color-error)" />
          <p className="text-sm font-body text-error">{uploadError}</p>
        </div>
      )}
      {/* Image Quality Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-agricultural-md p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-heading font-heading-semibold text-foreground mb-2">
              Tips for Better Results
            </h4>
            <ul className="text-sm font-body text-text-secondary space-y-1">
              <li>• Ensure good lighting conditions</li>
              <li>• Focus on the affected plant parts</li>
              <li>• Avoid blurry or distant shots</li>
              <li>• Include leaves, stems, or fruits showing symptoms</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Recent Images */}
      <div className="space-y-3">
        <h4 className="text-sm font-heading font-heading-semibold text-foreground">
          Recent Images
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4]?.map((index) => (
            <button
              key={index}
              className="aspect-square bg-muted rounded-agricultural-md flex items-center justify-center hover:bg-muted/80 transition-agricultural"
              onClick={() => {/* Load recent image */}}
            >
              <Icon name="Image" size={20} color="var(--color-text-secondary)" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;