import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ className = '' }) => {
  const weatherData = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    rainfall: 12,
    windSpeed: 8,
    diseaseRisk: "Medium",
    location: "Kaduna, Nigeria"
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition?.includes('Cloudy')) return 'CloudSun';
    if (condition?.includes('Rain')) return 'CloudRain';
    if (condition?.includes('Sunny')) return 'Sun';
    return 'Cloud';
  };

  return (
    <div className={`bg-card rounded-agricultural-lg p-4 border border-border shadow-agricultural-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-heading-semibold text-card-foreground">Weather & Risk</h3>
        <Icon name={getWeatherIcon(weatherData?.condition)} size={24} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-heading font-heading-bold text-card-foreground">{weatherData?.temperature}°C</p>
            <p className="text-sm font-caption text-text-secondary">{weatherData?.condition}</p>
            <p className="text-xs font-caption text-text-secondary">{weatherData?.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Droplets" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-body text-text-secondary">{weatherData?.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Wind" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-body text-text-secondary">{weatherData?.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* Disease Risk Alert */}
        <div className="p-3 rounded-agricultural-md bg-muted">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-card-foreground">Disease Risk Level</span>
            <span className={`px-2 py-1 rounded-agricultural-sm text-xs font-caption ${getRiskColor(weatherData?.diseaseRisk)}`}>
              {weatherData?.diseaseRisk}
            </span>
          </div>
          <p className="text-xs font-caption text-text-secondary">
            High humidity may increase fungal disease risk. Monitor crops closely.
          </p>
        </div>

        {/* Weekly Forecast */}
        <div className="grid grid-cols-4 gap-2">
          {['Today', 'Tomorrow', 'Wed', 'Thu']?.map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-xs font-caption text-text-secondary mb-1">{day}</p>
              <Icon name="CloudSun" size={16} color="var(--color-text-secondary)" className="mx-auto mb-1" />
              <p className="text-sm font-body text-card-foreground">{28 - index}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;