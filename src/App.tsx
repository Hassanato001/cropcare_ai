import { useState, useRef, ChangeEvent } from 'react'; // TypeScript: Import specific types
import './App.css';

// --- TypeScript: Define a type for our prediction object ---
interface Prediction {
  class_name: string;
  confidence: string;
  error?: string; // The '?' makes the error property optional
}

function App() {
  // --- TypeScript: Provide types for our state variables ---
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for an input element

  const diseaseInfo = {
    cmd: {
      name: 'Cassava Mosaic Disease',
      url: 'https://en.wikipedia.org/wiki/Cassava_mosaic_virus'
    },
    cbsd: {
      name: 'Cassava Brown Streak Disease',
      url: 'https://en.wikipedia.org/wiki/Cassava_brown_streak_virus_disease'
    },
    healthy: {
      name: 'Healthy'
    }
  };

  // --- TypeScript: Add a type for the event 'e' ---
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining for safety
    if (file) {
      setImage(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);

    try {
      const response = await fetch('https://h-elinor-001-cropcare-ai-backend.hf.space/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data.prediction); 

    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderResult = () => {
    if (!prediction) return null;

    if (prediction.class_name === 'Uncertain') {
      return (
        <div className="result-box uncertain">
          <h3>Analysis Result</h3>
          <p>{prediction.error}</p>
          <p className="prediction-confidence">Confidence: <strong>{prediction.confidence}</strong></p>
        </div>
      );
    }

    // --- TypeScript: Type assertion for safety ---
    const infoKey = prediction.class_name as keyof typeof diseaseInfo;
    const info = diseaseInfo[infoKey];

    return (
      <div className="result-box">
        <h3>Analysis Result</h3>
        <p className="prediction-class">Prediction: <strong>{info?.name || prediction.class_name.toUpperCase()}</strong></p>
        <p className="prediction-confidence">Confidence: <strong>{prediction.confidence}</strong></p>
        {info?.url && (
          <a href={info.url} target="_blank" rel="noopener noreferrer" className="learn-more-link">
            Learn more about {info.name}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌿 CropCare AI</h1>
        <p>Your AI assistant for detecting diseases in cassava leaves.</p>
      </header>
      <main>
        <div className="card">
          {!image && (
            <div className="upload-section">
              <h2>1. Upload an Image</h2>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                ref={fileInputRef} 
              />
            </div>
          )}

          {image && (
            <div className="preview-section">
              <h2>Image Preview</h2>
              <img src={image} alt="Uploaded leaf" className="image-preview" />
            </div>
          )}

          {image && !prediction && !loading && (
            <div className="analyze-section">
              <h2>2. Analyze the Image</h2>
              <button onClick={handleAnalyze} disabled={loading}>
                Analyze
              </button>
            </div>
          )}
          
          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Analyzing, please wait...</p>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {!loading && prediction && (
            <>
              {renderResult()}
              <button onClick={handleReset} className="reset-button">
                Analyze Another Image
              </button>
            </>
          )}
        </div>
      </main>
      <footer>
        <p>Built with AI. Always consult a local expert for a final diagnosis.</p>
      </footer>
    </div>
  )
}

export default App;
