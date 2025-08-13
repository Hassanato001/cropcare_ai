import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search diagnoses...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions = [
    "Bacterial Blight",
    "Mosaic Virus", 
    "Brown Streak",
    "Anthracnose",
    "Leaf Spot",
    "Cassava",
    "Yam",
    "Maize",
    "January 2025",
    "Completed treatments",
    "High confidence"
  ];

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onKeyPress={(e) => {
            if (e?.key === 'Enter') {
              handleSearch(searchTerm);
            }
          }}
          className="pl-10 pr-10"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} color="var(--color-text-secondary)" />
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-primary transition-agricultural rounded-agricultural-sm hover:bg-muted"
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={() => setShowSuggestions(false)}
          />
          
          {/* Suggestions */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-agricultural-md shadow-agricultural-lg z-dropdown">
            <div className="py-2">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-popover-foreground hover:bg-muted transition-agricultural"
                >
                  <Icon name="Search" size={14} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;