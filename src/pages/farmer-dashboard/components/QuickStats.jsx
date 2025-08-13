import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ className = '' }) => {
  const stats = [
    {
      label: "Total Diagnoses",
      value: 47,
      icon: "Camera",
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+12 this month"
    },
    {
      label: "Diseases Detected",
      value: 8,
      icon: "AlertTriangle",
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: "3 active cases"
    },
    {
      label: "Treatments Applied",
      value: 23,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "85% success rate"
    },
    {
      label: "Healthy Crops",
      value: 16,
      icon: "Heart",
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "68% of total"
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-agricultural-lg p-4 border border-border shadow-agricultural-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-agricultural-md flex items-center justify-center ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} color={stat?.color?.replace('text-', 'var(--color-')} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-heading-bold text-card-foreground">
                {stat?.value}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-body font-medium text-card-foreground mb-1">
              {stat?.label}
            </h4>
            <p className="text-xs font-caption text-text-secondary">
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;