import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import openAIService from '../../services/openaiService';

const AgriculturalChatbot = ({ isOpen, onClose, cropContext = {} }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const welcomeMessages = {
    en: {
      welcome: "Hello! I\'m your agricultural assistant. I can help you with:",
      features: [
        "🌱 Crop disease identification and treatment",
        "🌧️ Weather-based farming advice",
        "💧 Irrigation and water management",
        "🌾 Pest and disease prevention",
        "📊 Crop rotation and planning"
      ],
      askQuestion: "What would you like to know about your crops?"
    },
    ha: {
      welcome: "Sannu! Ni mataimakinka ne na noma. Zan iya taimaka maka da:",
      features: [
        "🌱 Gano cututtukan amfanin gona da maganinsu",
        "🌧️ Shawarar noma dangane da yanayi",
        "💧 Ban ruwa da sarrafa ruwa",
        "🌾 Kare amfanin gona daga kwari da cututtuka",
        "📊 Jujjuyar amfanin gona da tsarawa"
      ],
      askQuestion: "Me kake so ka san game da amfanin gonarka?"
    }
  };

  const quickQuestions = {
    en: [
      "How can I prevent crop diseases?",
      "What\'s the best time to plant cassava?",
      "My crops are turning yellow, what should I do?",
      "How often should I water my crops?",
      "What organic pesticides can I use?"
    ],
    ha: [
      "Ta yaya zan iya kare amfanin gona daga cututtuka?",
      "Wane lokaci ne mafi kyau don shukar cassava?",
      "Amfanin gonana yana rawaya, me in yi?",
      "Sau nawa in yi wa amfanin gonana ban ruwa?",
      "Wadanne maganin kashe kwari na halitta zan iya amfani da su?"
    ]
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Initialize with welcome message
    if (messages?.length === 0) {
      const welcomeContent = welcomeMessages?.[savedLanguage] || welcomeMessages?.en;
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: welcomeContent?.welcome,
          features: welcomeContent?.features,
          timestamp: new Date()
        }
      ]);
    }

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language || 'en');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage?.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await openAIService?.getChatResponse(
        inputMessage?.trim(),
        currentLanguage,
        cropContext
      );

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: currentLanguage === 'ha' ?'Yi hakuri, an sami matsala. Ka sake gwadawa.' :'Sorry, I encountered an error. Please try again.',
        isError: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  const currentContent = welcomeMessages?.[currentLanguage] || welcomeMessages?.en;
  const currentQuestions = quickQuestions?.[currentLanguage] || quickQuestions?.en;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-card border-0 md:border border-border rounded-t-3xl md:rounded-agricultural-xl w-full md:max-w-2xl h-[90vh] md:h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-3xl md:rounded-t-agricultural-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-heading font-heading-semibold text-foreground">
                {currentLanguage === 'ha' ? 'Mataimakinka na Noma' : 'Agricultural Assistant'}
              </h3>
              <p className="text-xs font-caption text-text-secondary">
                {currentLanguage === 'ha' ? 'Shiri don taimako' : 'Ready to help'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message?.type === 'user' ?'bg-primary text-primary-foreground rounded-l-2xl rounded-tr-2xl rounded-br-md' 
                  : `${message?.isError ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted'} text-foreground rounded-r-2xl rounded-tl-2xl rounded-bl-md`
              } p-3`}>
                <div className="font-body text-sm leading-relaxed">
                  {message?.content}
                </div>
                
                {message?.features && (
                  <div className="mt-3 space-y-2">
                    {message?.features?.map((feature, index) => (
                      <div key={index} className="text-sm font-body text-text-secondary">
                        {feature}
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm font-body text-foreground">
                        {currentContent?.askQuestion}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-xs font-caption text-muted-foreground">
                  {message?.timestamp?.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-r-2xl rounded-tl-2xl rounded-bl-md p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm font-body text-text-secondary">
                    {currentLanguage === 'ha' ? 'Ina tunani...' : 'Thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages?.length <= 1 && (
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-heading font-heading-semibold text-foreground mb-3">
              {currentLanguage === 'ha' ? 'Tambayoyi masu sauri:' : 'Quick questions:'}
            </h4>
            <div className="space-y-2">
              {currentQuestions?.slice(0, 3)?.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 bg-muted hover:bg-muted/80 rounded-agricultural-lg border border-border hover:border-primary/30 transition-all text-sm font-body"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  currentLanguage === 'ha' ?'Rubuta tambayarka...' :'Type your question...'
                }
                className="w-full p-3 bg-background border border-border rounded-agricultural-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-body"
                rows="2"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage?.trim() || isLoading}
              size="icon"
              className="flex-shrink-0 w-10 h-10"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalChatbot;