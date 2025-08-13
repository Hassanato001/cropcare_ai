import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters, className = '' }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const cropOptions = [
    { value: '', label: 'All Crops' },
    { value: 'cassava', label: 'Cassava' },
    { value: 'yam', label: 'Yam' },
    { value: 'maize', label: 'Maize' }
  ];

  const diseaseOptions = [
    { value: '', label: 'All Diseases' },
    { value: 'bacterial-blight', label: 'Bacterial Blight' },
    { value: 'mosaic-virus', label: 'Mosaic Virus' },
    { value: 'brown-streak', label: 'Brown Streak' },
    { value: 'anthracnose', label: 'Anthracnose' },
    { value: 'leaf-spot', label: 'Leaf Spot' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const confidenceOptions = [
    { value: '', label: 'All Confidence' },
    { value: 'high', label: 'High (90%+)' },
    { value: 'medium', label: 'Medium (70-89%)' },
    { value: 'low', label: 'Low (<70%)' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      cropType: '',
      diseaseCategory: '',
      treatmentStatus: '',
      confidence: '',
      dateFrom: '',
      dateTo: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-heading-semibold text-foreground">Filter Diagnoses</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Date Range */}
      <div className="space-y-4">
        <h4 className="text-sm font-heading font-heading-medium text-foreground">Date Range</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="From"
            type="date"
            value={localFilters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            label="To"
            type="date"
            value={localFilters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      </div>

      {/* Crop Type */}
      <Select
        label="Crop Type"
        options={cropOptions}
        value={localFilters?.cropType}
        onChange={(value) => handleFilterChange('cropType', value)}
      />

      {/* Disease Category */}
      <Select
        label="Disease Category"
        options={diseaseOptions}
        value={localFilters?.diseaseCategory}
        onChange={(value) => handleFilterChange('diseaseCategory', value)}
        searchable
      />

      {/* Treatment Status */}
      <Select
        label="Treatment Status"
        options={statusOptions}
        value={localFilters?.treatmentStatus}
        onChange={(value) => handleFilterChange('treatmentStatus', value)}
      />

      {/* Confidence Level */}
      <Select
        label="Confidence Level"
        options={confidenceOptions}
        value={localFilters?.confidence}
        onChange={(value) => handleFilterChange('confidence', value)}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex-1"
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear All
        </Button>
        <Button
          variant="default"
          onClick={applyFilters}
          className="flex-1"
          iconName="Filter"
          iconPosition="left"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Slide-out Panel */}
      <div className={`lg:hidden fixed inset-0 z-modal transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-background border-l border-border transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto p-6">
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-80 bg-card border border-border rounded-agricultural-md p-6 ${className}`}>
        <FilterContent />
      </div>
    </>
  );
};

export default FilterPanel;