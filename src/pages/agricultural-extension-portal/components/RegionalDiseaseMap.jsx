import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const RegionalDiseaseMap = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedDisease, setSelectedDisease] = useState('');

  const timeframeOptions = [
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'quarter', label: 'Last 3 months' },
    { value: 'year', label: 'Last 12 months' }
  ];

  const diseaseOptions = [
    { value: '', label: 'All Diseases' },
    { value: 'cassava-mosaic', label: 'Cassava Mosaic Virus' },
    { value: 'yam-anthracnose', label: 'Yam Anthracnose' },
    { value: 'maize-streak', label: 'Maize Streak Virus' },
    { value: 'rice-blast', label: 'Rice Blast' }
  ];

  const regionData = [
    {
      id: 1,
      name: "Northern Region",
      coordinates: { lat: 11.0, lng: 8.0 },
      cases: 45,
      severity: "high",
      dominantDisease: "Maize Streak Virus",
      affectedFarms: 23,
      trend: "increasing"
    },
    {
      id: 2,
      name: "Southern Region",
      coordinates: { lat: 6.5, lng: 7.0 },
      cases: 32,
      severity: "medium",
      dominantDisease: "Cassava Mosaic Virus",
      affectedFarms: 18,
      trend: "stable"
    },
    {
      id: 3,
      name: "Eastern Region",
      coordinates: { lat: 6.0, lng: 8.5 },
      cases: 28,
      severity: "medium",
      dominantDisease: "Yam Anthracnose",
      affectedFarms: 15,
      trend: "decreasing"
    },
    {
      id: 4,
      name: "Western Region",
      coordinates: { lat: 7.5, lng: 4.0 },
      cases: 19,
      severity: "low",
      dominantDisease: "Rice Blast",
      affectedFarms: 12,
      trend: "stable"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return { icon: 'TrendingUp', color: 'text-error' };
      case 'decreasing': return { icon: 'TrendingDown', color: 'text-success' };
      case 'stable': return { icon: 'Minus', color: 'text-warning' };
      default: return { icon: 'Minus', color: 'text-text-secondary' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-agricultural-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Regional Disease Monitoring
          </h2>
          <div className="flex space-x-2">
            <Select
              options={diseaseOptions}
              value={selectedDisease}
              onChange={setSelectedDisease}
              placeholder="Filter by disease"
              className="w-48"
            />
            <Select
              options={timeframeOptions}
              value={selectedTimeframe}
              onChange={setSelectedTimeframe}
              className="w-36"
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Map Container */}
        <div className="relative bg-muted rounded-agricultural-md mb-6 overflow-hidden">
          <div className="h-80 w-full">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Nigeria Agricultural Regions"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=9.0765,8.6753&z=6&output=embed"
              className="rounded-agricultural-md"
            />
          </div>
          
          {/* Map Overlay with Region Markers */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative h-full w-full">
              {regionData?.map((region, index) => (
                <div
                  key={region?.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto`}
                  style={{
                    left: `${25 + (index * 20)}%`,
                    top: `${30 + (index * 15)}%`
                  }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-agricultural-md flex items-center justify-center cursor-pointer ${
                    region?.severity === 'high' ? 'bg-error' :
                    region?.severity === 'medium' ? 'bg-warning' : 'bg-success'
                  }`}>
                    <span className="text-white text-xs font-mono font-bold">
                      {region?.cases}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Region Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionData?.map((region) => {
            const trendData = getTrendIcon(region?.trend);
            return (
              <div key={region?.id} className="p-4 border border-border rounded-agricultural-md hover:bg-muted/50 transition-agricultural">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-heading font-heading-semibold text-foreground">
                    {region?.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-mono border ${getSeverityColor(region?.severity)}`}>
                      {region?.severity}
                    </span>
                    <div className={`flex items-center space-x-1 ${trendData?.color}`}>
                      <Icon name={trendData?.icon} size={14} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Total Cases:</span>
                      <span className="font-mono text-foreground font-medium">{region?.cases}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Affected Farms:</span>
                      <span className="font-mono text-foreground font-medium">{region?.affectedFarms}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Trend:</span>
                      <span className={`font-mono capitalize ${trendData?.color}`}>
                        {region?.trend}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Dominant:</span>
                      <span className="font-body text-foreground text-xs truncate">
                        {region?.dominantDisease}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-muted rounded-agricultural-md">
          <h4 className="text-sm font-heading font-heading-semibold text-foreground mb-3">
            Severity Legend
          </h4>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-error rounded-full"></div>
              <span className="text-sm font-body text-text-secondary">High Risk (&gt;40 cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-warning rounded-full"></div>
              <span className="text-sm font-body text-text-secondary">Medium Risk (20-40 cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-success rounded-full"></div>
              <span className="text-sm font-body text-text-secondary">Low Risk (&lt;20 cases)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalDiseaseMap;