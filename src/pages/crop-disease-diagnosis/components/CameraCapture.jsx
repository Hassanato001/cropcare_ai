import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraCapture = ({ onImageCapture, selectedCropType, isProcessing }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.");
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    context?.drawImage(video, 0, 0);

    canvas?.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `crop-image-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        onImageCapture(file);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  }, [onImageCapture, stopCamera]);

  const handleCapture = () => {
    if (videoRef?.current && canvasRef?.current) {
      const canvas = canvasRef?.current;
      const video = videoRef?.current;
      const context = canvas?.getContext('2d');

      canvas.width = video?.videoWidth;
      canvas.height = video?.videoHeight;
      context?.drawImage(video, 0, 0, canvas?.width, canvas?.height);

      // Convert to blob and create File object
      canvas?.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          const imageFile = new File([blob], `crop-diagnosis-${Date.now()}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          
          onImageCapture(imageUrl, imageFile); // Pass both URL and File object
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const CameraOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner guides */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-white opacity-80" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-white opacity-80" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-white opacity-80" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-white opacity-80" />
      
      {/* Center guide */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white border-dashed rounded-lg opacity-60" />
      
      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-agricultural-md">
        <p className="text-white text-sm font-caption text-center">
          Position the affected leaf or plant part within the frame
        </p>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-agricultural-lg p-6">
        <Icon name="AlertCircle" size={48} color="var(--color-error)" className="mb-4" />
        <h3 className="text-lg font-heading font-heading-semibold text-error mb-2">Camera Error</h3>
        <p className="text-sm font-body text-text-secondary text-center mb-4">{error}</p>
        <Button variant="outline" onClick={startCamera} iconName="Camera">
          Try Again
        </Button>
      </div>
    );
  }

  if (!isCameraActive) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-agricultural-lg p-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Icon name="Camera" size={40} color="var(--color-primary)" />
        </div>
        <h3 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
          Ready to Diagnose
        </h3>
        <p className="text-sm font-body text-text-secondary text-center mb-6 max-w-sm">
          Take a clear photo of the affected plant part for AI-powered disease detection
        </p>
        <Button 
          variant="default" 
          size="lg" 
          onClick={startCamera}
          iconName="Camera"
          iconPosition="left"
          disabled={isProcessing}
        >
          Start Camera
        </Button>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-agricultural-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-96 object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />
      <CameraOverlay />
      {/* Camera controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={stopCamera}
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          <Icon name="X" size={20} />
        </Button>
        
        <button
          onClick={captureImage}
          disabled={isProcessing}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-agricultural-lg hover:bg-gray-100 transition-agricultural disabled:opacity-50"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Camera" size={24} color="white" />
          </div>
        </button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => {/* Switch camera */}}
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          <Icon name="RotateCcw" size={20} />
        </Button>
      </div>
      {/* Crop type indicator */}
      <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-agricultural-md">
        <p className="text-white text-sm font-caption">
          {selectedCropType?.charAt(0)?.toUpperCase() + selectedCropType?.slice(1)} Detection
        </p>
      </div>
    </div>
  );
};

export default CameraCapture;