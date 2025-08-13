import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilters = ({ onSearchChange, onCategoryChange, onDifficultyChange, onLanguageChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'disease-identification', label: 'Disease Identification' },
    { value: 'prevention', label: 'Prevention Techniques' },
    { value: 'treatment', label: 'Treatment Methods' },
    { value: 'seasonal-tips', label: 'Seasonal Farming Tips' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'soil-management', label: 'Soil Management' }
  ];

  const difficultyOptions = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ha', label: 'Hausa' },
    { value: 'yo', label: 'Yoruba' },
    { value: 'ig', label: 'Igbo' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleDifficultyChange = (value) => {
    setSelectedDifficulty(value);
    onDifficultyChange(value);
  };

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    onLanguageChange(value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search educational resources..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select category"
          />

          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            placeholder="Select difficulty"
          />

          <Select
            label="Language"
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;