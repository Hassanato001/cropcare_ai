import OpenAI from 'openai';

/**
 * OpenAI service for crop disease detection and agricultural assistance
 * Handles image analysis, disease identification, and treatment recommendations
 */
class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    
    // Nigerian crop disease database with local context
    this.diseaseDatabase = {
      cassava: {
        diseases: [
          {
            name: 'Cassava Mosaic Disease',
            scientific: 'Cassava Mosaic Virus',
            symptoms: ['yellow mosaic patterns', 'leaf distortion', 'stunted growth'],
            causes: ['whitefly transmission', 'infected cuttings'],
            treatments: ['remove infected plants', 'use resistant varieties', 'control whiteflies']
          },
          {
            name: 'Cassava Anthracnose',
            scientific: 'Colletotrichum gloeosporioides',
            symptoms: ['dark sunken lesions', 'leaf spots', 'stem cankers'],
            causes: ['high humidity', 'water splash', 'infected plant material'],
            treatments: ['improve drainage', 'copper fungicide', 'crop rotation']
          },
          {
            name: 'Cassava Bacterial Blight',
            scientific: 'Xanthomonas axonopodis',
            symptoms: ['angular leaf spots', 'bacterial ooze', 'wilting'],
            causes: ['bacterial infection', 'water splash', 'wounded plants'],
            treatments: ['copper sprays', 'resistant varieties', 'field sanitation']
          }
        ]
      },
      maize: {
        diseases: [
          {
            name: 'Maize Streak Disease',
            scientific: 'Maize Streak Virus',
            symptoms: ['yellow streaks on leaves', 'stunted growth', 'reduced yield'],
            causes: ['leafhopper transmission', 'infected seeds'],
            treatments: ['plant early', 'use resistant varieties', 'control leafhoppers']
          },
          {
            name: 'Northern Corn Leaf Blight',
            scientific: 'Exserohilum turcicum',
            symptoms: ['large gray lesions', 'cigar-shaped spots', 'leaf blight'],
            causes: ['cool humid weather', 'crop residue', 'overhead irrigation'],
            treatments: ['crop rotation', 'fungicide application', 'resistant varieties']
          }
        ]
      },
      yam: {
        diseases: [
          {
            name: 'Yam Anthracnose',
            scientific: 'Colletotrichum gloeosporioides',
            symptoms: ['brown leaf spots', 'stem lesions', 'tuber rot'],
            causes: ['high humidity', 'poor storage', 'infected planting material'],
            treatments: ['fungicide sprays', 'proper storage', 'field sanitation']
          }
        ]
      }
    };
  }

  /**
   * Analyzes crop image for disease detection using GPT-4 Vision
   * @param {File|string} image - Image file or base64 string
   * @param {string} cropType - Type of crop (cassava, maize, yam, etc.)
   * @param {string} language - Language for response (en, ha, yo, ig)
   * @returns {Promise<Object>} Disease analysis results
   */
  async analyzeCropDisease(image, cropType = 'unknown', language = 'en') {
    try {
      // Convert image to base64 if it's a File object
      let imageData;
      if (image instanceof File) {
        imageData = await this.convertFileToBase64(image);
      } else {
        imageData = image;
      }

      const cropContext = this.diseaseDatabase?.[cropType?.toLowerCase()] || {};
      const possibleDiseases = cropContext?.diseases || [];

      const systemPrompt = `You are an expert agricultural pathologist specializing in Nigerian crop diseases. 
      Analyze this ${cropType} plant image for diseases, pests, or health issues.
      
      Consider these common ${cropType} diseases in Nigeria: ${possibleDiseases?.map(d => d?.name)?.join(', ')}.
      
      Provide analysis in this exact JSON format:
      {
        "disease": {
          "name": "Disease name",
          "scientificName": "Scientific name",
          "confidence": 85,
          "severity": "mild|moderate|severe",
          "description": "Detailed description"
        },
        "symptoms": ["symptom1", "symptom2"],
        "affectedAreas": [
          {"x": 25, "y": 30, "width": 15, "height": 20, "severity": 75}
        ],
        "treatments": {
          "immediate": ["action1", "action2"],
          "organic": ["treatment1", "treatment2"],
          "chemical": ["fungicide1", "pesticide1"]
        },
        "prevention": ["tip1", "tip2"],
        "economicImpact": "low|medium|high",
        "spreadRisk": "low|medium|high"
      }`;

      const response = await this.openai?.chat?.completions?.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this ${cropType} plant image for diseases or health issues. Respond in ${language === 'en' ? 'English' : language === 'ha' ? 'Hausa' : language === 'yo' ? 'Yoruba' : 'Igbo'}.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'crop_disease_analysis',
            schema: {
              type: 'object',
              properties: {
                disease: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    scientificName: { type: 'string' },
                    confidence: { type: 'number' },
                    severity: { type: 'string' },
                    description: { type: 'string' }
                  },
                  required: ['name', 'scientificName', 'confidence', 'severity', 'description']
                },
                symptoms: {
                  type: 'array',
                  items: { type: 'string' }
                },
                affectedAreas: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      x: { type: 'number' },
                      y: { type: 'number' },
                      width: { type: 'number' },
                      height: { type: 'number' },
                      severity: { type: 'number' }
                    }
                  }
                },
                treatments: {
                  type: 'object',
                  properties: {
                    immediate: { type: 'array', items: { type: 'string' } },
                    organic: { type: 'array', items: { type: 'string' } },
                    chemical: { type: 'array', items: { type: 'string' } }
                  }
                },
                prevention: {
                  type: 'array',
                  items: { type: 'string' }
                },
                economicImpact: { type: 'string' },
                spreadRisk: { type: 'string' }
              },
              required: ['disease', 'symptoms', 'treatments', 'prevention', 'economicImpact', 'spreadRisk'],
              additionalProperties: false
            }
          }
        },
        max_tokens: 2000,
        temperature: 0.3
      });

      const analysis = JSON.parse(response?.choices?.[0]?.message?.content);
      
      // Enhance with local agricultural extension recommendations
      analysis.localContext = this.addLocalContext(analysis, cropType, language);
      
      return analysis;
      
    } catch (error) {
      console.error('Error analyzing crop disease:', error);
      throw new Error(`Disease analysis failed: ${error.message}`);
    }
  }

  /**
   * Provides contextual agricultural advice through chat
   * @param {string} userMessage - Farmer's question or concern
   * @param {string} language - Response language
   * @param {Object} context - Additional context (crop type, location, etc.)
   * @returns {Promise<string>} AI-generated agricultural advice
   */
  async getChatResponse(userMessage, language = 'en', context = {}) {
    try {
      const systemPrompt = `You are an experienced Nigerian agricultural extension officer and crop specialist. 
      Provide practical, locally-relevant farming advice considering Nigerian climate, soil conditions, and available resources.
      
      Consider:
      - Local weather patterns (dry season, rainy season)
      - Available materials and treatments in Nigerian markets
      - Cost-effective solutions for smallholder farmers
      - Traditional and modern farming practices
      - Crop varieties suited for Nigerian conditions
      
      Respond in ${language === 'en' ? 'English' : language === 'ha' ? 'Hausa' : language === 'yo' ? 'Yoruba' : 'Igbo'}.
      Keep responses practical, actionable, and empathetic.`;

      const contextMessage = context?.cropType ? 
        `Context: The farmer is growing ${context?.cropType}${context?.location ? ` in ${context?.location}` : ''}${context?.season ? ` during ${context?.season}` : ''}.` : 
        '';

      const response = await this.openai?.chat?.completions?.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `${contextMessage}\n\nFarmer's question: ${userMessage}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      return response?.choices?.[0]?.message?.content;
      
    } catch (error) {
      console.error('Error getting chat response:', error);
      throw new Error(`Chat response failed: ${error.message}`);
    }
  }

  /**
   * Generates treatment recommendations with local market availability
   * @param {Object} diseaseAnalysis - Disease analysis results
   * @param {string} language - Language for recommendations
   * @returns {Promise<Object>} Detailed treatment recommendations
   */
  async generateTreatmentRecommendations(diseaseAnalysis, language = 'en') {
    try {
      const systemPrompt = `Generate detailed, practical treatment recommendations for Nigerian farmers.
      Include:
      - Immediate actions to take
      - Organic/traditional treatments using locally available materials
      - Chemical treatments available in Nigerian agricultural stores
      - Cost estimates in Nigerian Naira
      - Step-by-step application instructions
      - Safety precautions
      - Expected timeline for recovery
      
      Format as JSON with clear categories and practical instructions.`;

      const response = await this.openai?.chat?.completions?.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Disease: ${diseaseAnalysis?.disease?.name}
            Symptoms: ${diseaseAnalysis?.symptoms?.join(', ')}
            Severity: ${diseaseAnalysis?.disease?.severity}
            
            Generate treatment recommendations in ${language === 'en' ? 'English' : language === 'ha' ? 'Hausa' : language === 'yo' ? 'Yoruba' : 'Igbo'}.`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'treatment_recommendations',
            schema: {
              type: 'object',
              properties: {
                immediate: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      description: { type: 'string' },
                      steps: { type: 'array', items: { type: 'string' } },
                      cost: { type: 'number' },
                      duration: { type: 'string' },
                      materials: { type: 'array', items: { type: 'string' } }
                    }
                  }
                },
                organic: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      description: { type: 'string' },
                      steps: { type: 'array', items: { type: 'string' } },
                      cost: { type: 'number' },
                      duration: { type: 'string' },
                      materials: { type: 'array', items: { type: 'string' } }
                    }
                  }
                },
                chemical: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      description: { type: 'string' },
                      steps: { type: 'array', items: { type: 'string' } },
                      cost: { type: 'number' },
                      duration: { type: 'string' },
                      materials: { type: 'array', items: { type: 'string' } }
                    }
                  }
                }
              },
              required: ['immediate', 'organic', 'chemical'],
              additionalProperties: false
            }
          }
        },
        max_tokens: 2000,
        temperature: 0.3
      });

      return JSON.parse(response?.choices?.[0]?.message?.content);
      
    } catch (error) {
      console.error('Error generating treatment recommendations:', error);
      throw new Error(`Treatment generation failed: ${error.message}`);
    }
  }

  /**
   * Converts File object to base64 string
   * @param {File} file - Image file
   * @returns {Promise<string>} Base64 encoded image
   */
  async convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Adds local Nigerian agricultural context to disease analysis
   * @param {Object} analysis - Disease analysis results
   * @param {string} cropType - Crop type
   * @param {string} language - Language for localization
   * @returns {Object} Enhanced local context
   */
  addLocalContext(analysis, cropType, language) {
    const seasonalAdvice = {
      en: {
        drySeasonTips: 'During dry season, increase irrigation frequency and mulch around plants.',
        rainySeasonTips: 'In rainy season, improve drainage and increase fungicide applications.',
        marketInfo: 'Check with local agricultural development programs (ADP) for subsidized inputs.'
      },
      ha: {
        drySeasonTips: 'A lokacin bushewa, kara yawan ban ruwa da rufe kasan da ciyawa.',
        rainySeasonTips: 'A lokacin damina, inganta magudanar ruwa da kara amfani da maganin kashe kwayoyin cuta.',
        marketInfo: 'Bincika shirye-shiryen ci gaban noma (ADP) don samun kayan aikin da aka rage farashi.'
      }
    };

    const currentLanguageContext = seasonalAdvice?.[language] || seasonalAdvice?.en;

    return {
      seasonalAdvice: currentLanguageContext,
      localResources: {
        extensionServices: 'Contact your local Agricultural Development Program (ADP) office',
        emergencyContacts: 'Nigerian Agricultural Insurance Corporation: 08000NAIC',
        marketPrices: 'Check current input prices at local agricultural markets'
      },
      climateConsiderations: {
        bestTreatmentTime: 'Early morning or late evening applications',
        weatherFactors: 'Monitor humidity levels and rainfall patterns'
      }
    };
  }
}

// Create singleton instance
const openAIService = new OpenAIService();
export default openAIService;