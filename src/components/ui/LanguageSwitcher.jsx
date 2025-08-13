import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageSwitcher = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cropcare-language');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('cropcare-language', languageCode);
    setIsOpen(false);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: languageCode } 
    }));
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
        aria-label="Select language"
      >
        <span className="text-sm">{getCurrentLanguage()?.flag}</span>
        <span className="hidden sm:block text-sm font-body">{getCurrentLanguage()?.name}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-40 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
            <div className="py-1">
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageChange(language?.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left transition-agricultural ${
                    currentLanguage === language?.code
                      ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-sm">{language?.flag}</span>
                  <span className="text-sm font-body">{language?.name}</span>
                  {currentLanguage === language?.code && (
                    <Icon name="Check" size={14} color="var(--color-primary)" className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;